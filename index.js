import * as pokemonDetails from '/pokemonObjectDetails.js';
import * as utils from '/utils.js';
import { pokemonFactory } from '/pokemon.js';

$(document).ready(async () => {
    let request = '';
    if (request) request.abort();
    let queryParam = window.location.search.substring(1).split('=');
    let selected = {};
    selected[queryParam[0]] = queryParam[1];
    if (!selected.gen && !selected.type) {
        selected['gen'] = 1;
    }
    request = fetchPokemons(selected);
});

const poke_container = document.getElementById('poke_container');
const generations = {
    '1': {
        start: 1,
        end: 151
    },
    '2': {
        start: 152,
        end: 251
    },
    '3': {
        start: 252,
        end: 386
    },
    '4': {
        start: 387,
        end: 494
    },
    '5': {
        start: 495,
        end: 649
    },
    '6': {
        start: 650,
        end: 721
    },
    '7': {
        start: 722,
        end: 809
    },
    '8': {
        start: 810,
        end: 898
    }
}

async function fetchPokemons(gen_type) {
    if (gen_type.gen) {
        for (let i = generations[gen_type.gen].start; i <= generations[gen_type.gen].end; i++) {
            await getPokemon(i);
        }
    }
    if(gen_type.type) {
        const url = `https://pokeapi.co/api/v2/type/${gen_type.type}`;
        $.get(url, async res => {
            const pokemons = res.pokemon.length;
        for (let i = 0; i < pokemons; i++) {
            let pokeName = res.pokemon[i].pokemon.name;
            await getPokemon(pokeName);
        }
        });
    }
}

async function getPokemon(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return $.get(url, res => {
        if (res.id < 1000) {
            createPokemonCard(res);
        }
    });
}

function createPokemonCard(pokemon) {
    const pokemonElement = document.createElement("div");
    $(pokemonElement).attr("id", pokemon.name);
    pokemonElement.classList.add('pokemon');
    let name = utils.capitalizeName(pokemon.name);
    if (pokemon.name.length > 10) {
        name = utils.formatPokemonName(pokemon.name);
    }
    const types = pokemonDetails.getPokemonTypes(pokemon.types, 'es');
    const typesImg = pokemonDetails.getPokemonTypeImage(pokemon.types);
    let color = pokemonDetails.typesObj[pokemon.types[0].type.name].color;
    if (pokemon.types.length === 2) {
        color = `linear-gradient(to right, ${pokemonDetails.typesObj[pokemon.types[0].type.name].color}, ${pokemonDetails.typesObj[pokemon.types[1].type.name].color})`;
    }

    pokemonElement.style.background = color;

    const pokemon_types = document.createElement('div');
    $(pokemon_types).append(typesImg[0]);
    if (typesImg[1]) $(pokemon_types).append(typesImg[1]);
    $(pokemon_types).addClass('d-flex').addClass('justify-content-center');

    const pokeInnerHTML = `
        <div class="img-container">
            <img src="${pokemon.sprites.front_default}">
        </div>
        <div class="info">
            <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
        </div>
    `;

    pokemonElement.innerHTML = pokeInnerHTML;
    pokemonElement.children[1].appendChild(pokemon_types);

    pokemonElement.addEventListener('click', function () {
        let nestId = $(this).attr('id');
        sessionStorage.setItem('pokemon', nestId);
        let url = `/pokemonDetails.html?name=${nestId}`;
        window.location.href = url;
    });

    poke_container.appendChild(pokemonElement);
}

//<img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png">
//<img src="${pokemon.sprites.front_default}">
//<img src="${pokemonDetails.getPokemonImg(pokemon)}" />
