import * as utils from '/utils.js';
import * as pokeDetails from '/pokemonObjectDetails.js';
import { getPokemonData } from '/pokemon_cards.js';
import { pokemonFactory } from '/pokemon.js';

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

const queryParam = window.location.search.substring(1).split('=');
const pokeId = queryParam[1];

const pokemon = await pokemonFactory(pokeId);
console.log(pokemon);

const stats_colors = {
    hp: 'red',
    attack: 'orange',
    defense: 'yellow',
    'special-attack': 'blue',
    'special-defense': 'green',
    speed: 'pink'
}

$("#pokemon_image").attr('src', pokemon.sprites.other['official-artwork']['front_default']).css('z-index', 2);
$("#pokemon_name").text(pokemon.name);
$("#pokemon_description").text(pokemon.description);