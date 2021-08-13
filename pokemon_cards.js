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
        end: 893
    }
}

const url_get_pokemon_data = 'https://pokeapi.co/api/v2/pokemon/';

export async function fetchPokemons(gen, signal, container) {
    for (let i = generations[gen].start; i <= generations[gen].end; i++) {
        await getPokemon(i, signal, container);
    }
}

async function getPokemon(id, signal, container) {
    const url = `${url_get_pokemon_data}${id}`;
    const res = await fetch(url, { signal: signal })
        .catch(e => e);
    try {
        const pokemon = await res.json();
        createPokemonCard(pokemon, container);
    } catch {
    }
}

export async function getPokemonData(id) {
    return await $.getJSON(url_get_pokemon_data + id);
}

function createPokemonCard(pokemon, container) {
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
    pokemonElement.children[1].appendChild(typesImg);

    pokemonElement.addEventListener('click', function () {
        let nestId = $(this).attr('id');
        sessionStorage.setItem('pokemon', nestId);
        let url = `/pokemonDetails.html?name=${nestId}`
        window.location.href = url;
    });

    container.appendChild(pokemonElement);
}