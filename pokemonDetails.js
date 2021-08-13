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

$("#previous_pokemon").click(() => window.location.href = `/pokemonDetails.html?id=${pokemon.id - 1}`);
if (pokemon.id === 1 ) $("#previous_pokemon").addClass('disabled');
$("#next_pokemon").click(() => window.location.href = `/pokemonDetails.html?id=${pokemon.id + 1}`);
if (pokemon.id === 898) $("#next_pokemon").addClass('disabled');

$("#pokemon_name").text(pokemon.name);
$("#pokemon_number").text(`#${pokemon.id.toString().padStart(3, '0')}`);
$("#pokemon_description").text(pokemon.description);

for (let type of pokemon.type) {
    let type_div = document.createElement('div');
    $(type_div).html(type).css({ 'background-color': pokeDetails.typesObj[type['data-type-name']].color, cursor: 'pointer', width: '100px', 'border-radius': '20px', display: 'flex', 'justify-content': 'center', 'padding-bottom': '5px'}).click(() => window.location.href = `/index.html?type=${type['data-type-name']}`);
    $("#pokemon_types").append(type_div);
}

//Images pokemon
const pokeImage = $("#pokemon_image .card-body img");
$(pokeImage).attr('src', pokemon.sprites.other['official-artwork']['front_default']);
//Images buttons
$("#btn-artwork").click(() => pokeImage.attr('src', pokemon.sprites.other['official-artwork']['front_default']));
$("#btn-gen1").click(() => pokeImage.attr('src', pokemon.sprites.versions['generation-i']['red-blue']['front_default']));
$("#btn-gen2").click(() => pokeImage.attr('src', pokemon.sprites.versions['generation-ii']['gold']['front_default']));
$('#btn-gen3').click(() => pokeImage.attr('src', pokemon.sprites.versions['generation-iii']['ruby-sapphire']['front_default']));
$('#btn-gen1-r').click(() => pokeImage.attr('src', pokemon.sprites.versions['generation-iii']['firered-leafgreen']['front_default']));
$('#btn-gen4').click(() => pokeImage.attr('src', pokemon.sprites.versions['generation-iv']['diamond-pearl']['front_default']));
$('#btn-gen2-r').click(() => pokeImage.attr('src', pokemon.sprites.versions['generation-iv']['heartgold-soulsilver']['front_default']));
$('#btn-gen5').click(() => pokeImage.attr('src', pokemon.sprites.versions['generation-v']['black-white'].animated['front_default']));
$("#btn-gen6").click(() => pokeImage.attr('src', pokemon.sprites.versions['generation-vi']['x-y']['front_default']));
$('#btn-gen3-r').click(() => pokeImage.attr('src', pokemon.sprites.versions['generation-vi']['omegaruby-alphasapphire']['front_default']));
$('#btn-gen7').click(() => pokeImage.attr('src', pokemon.sprites.versions['generation-vii']['ultra-sun-ultra-moon']['front_default']));
$('#btn-3d').click(() => pokeImage.attr('src', pokeDetails.getPokemonImg(pokemon)));
if (pokemon.id > generations[1].end) {
    $("#btn-gen1").addClass('disabled bg-button-disabled');
    $("#btn-gen1-r").addClass('disabled bg-button-disabled');
}
if (pokemon.id > generations[2].end) {
    $("#btn-gen2").addClass('disabled bg-button-disabled');
    $("#btn-gen2-r").addClass('disabled bg-button-disabled');
}
if (pokemon.id > generations[3].end) {
    $("#btn-gen3").addClass('disabled bg-button-disabled');
}
if (pokemon.id > generations[4].end) {
    $("#btn-gen4").addClass('disabled bg-button-disabled');
}
if (pokemon.id > generations[5].end) {
    $("#btn-gen5").addClass('disabled bg-button-disabled');
}
if (pokemon.id > generations[6].end) {
    $("#btn-gen6").addClass('disabled bg-button-disabled');
    $("#btn-gen3-r").addClass('disabled bg-button-disabled');
}
if (pokemon.id > generations[7].end) {
    $("#btn-gen7").addClass('disabled bg-button-disabled');
}

if (![133, 134, 135, 136, 196, 197, 470, 471, 700].includes(pokemon.id)) {
    for (let evol of Object.entries(pokemon.evolChain)) {
        console.log(evol);
        const evol_line = document.createElement('div');
        if (evol[0] !== Object.keys(pokemon.evolChain)[0]) {
            const evol_type = evolution_details(evol[1]);
            $(evol_line).addClass('arrowText arrowRight d-flex justify-content-center align-items-center').text(`${Object.keys(evol_type)[0]} ${evol_type[Object.keys(evol_type)[0]]}`);
            $("#pokemon_evolution_line > .card-body").append(evol_line);
        }
        const image_url = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';
        const apiSpecie = /https:\/\/pokeapi.co\/api\/v2\/pokemon-species\/([0-9]+)\//;
        const evol_id = apiSpecie.exec(evol[1].url)[1];
        const evol_css_rules = { 'max-height': '100px', cursor: 'pointer' };
        const evol_div = document.createElement('div');
        $(evol_div).click(() => window.location.href = `/pokemonDetails.html?id=${evol_id}`);
        const evol_img = $(`<img src="${image_url}${evol_id}.png" alt="${evol_id}" />`).css(evol_css_rules);
        $(evol_div).append(evol_img);
        $("#pokemon_evolution_line > .card-body").append(evol_div);
    }
}

function evolution_details({ evolution_details }) {
    evolution_details = evolution_details[0];
    const evol_identifiers = Object.keys(evolution_details);
    const active = evol_identifiers.filter(key => evolution_details[key]);
    const evol_type = {};
    if (active[0] === 'item') {
        evol_type[' '] = evolution_details[active[0]].name;
        return evol_type;
    }
    if (active[0] === 'held_item') {
        evol_type['trade with'] = evolution_details[active[0]].name;
        return evol_type;
    }
    if (active[0] === 'trigger') {
        evol_type[' '] = evolution_details[active[0]].name;
        return evol_type;
    }
    if (active[0] === 'location') {
        evol_type['lvl up at'] = evolution_details[active[0]].name;
    }
    if (active[0] === 'known_move') {
        evol_type['know'] = evolution_details[active[0]].name;
    }
    if (active[0] === 'party_species') {
        evol_type[evolution_details[active[0]].name] = 'in the party';
    }
    if (active.length === 3) {
        evol_type[`level-up ${evolution_details[active[0]]}`] = evolution_details[active[1]] === 1 ? 'attack' : 'sp-attack';
    }

    evol_type[active[0].split("_")[1]] = evolution_details[active[0]];
    return evol_type;
}

$("#pokemon_moves").html(pokemon.moves.filter(move => move['version_group_details'][0]['move_learn_method']['name'] !== 'machine' && move['version_group_details'][0]['move_learn_method']['name'] !== 'egg' && move['version_group_details'][0]['level_learned_at'] !== 0).sort((move1, move2) => move1['version_group_details'][0]['level_learned_at'] - move2['version_group_details'][0]['level_learned_at']).map(move => `${move.move.name} -> lvl ${move['version_group_details'][0]['level_learned_at']}`).map(move => $(`<p>${move}</p>`)[0]));

$("#pokemon_height").text(`${pokemon.height / 10} meters`).addClass('card-font-format');
$("#pokemon_weight").text(`${pokemon.weight / 10} kilograms`).addClass('card-font-format');

for (let egg_group of pokemon.egg_groups) {
    let egg_div = document.createElement('div');
    $(egg_div).text(utils.capitalizeName(egg_group.name)).addClass('card-font-format');
    if (pokemon.egg_groups.length > 1 && $("#pokemon_egg > .card-body").children().length > 0) {
        $("#pokemon_egg > .card-body").append($("<hr>"));
    }
    $("#pokemon_egg > .card-body").append(egg_div);
}

$("#pokemon_female").text(`Female: ${pokemon.gender.female}%`).addClass('card-font-format');
$("#pokemon_male").text(`Male: ${pokemon.gender.male}%`).addClass('card-font-format');

for (let stat of pokemon.stats) {
    let stat_div = document.createElement('div');
    let stat_name = document.createElement('div');
    stat_name.innerHTML = `
        <svg width='100%' height='100%' viewBox='0 0 500 75'>
            <text x='0' y='55' style='fill: ${stats_colors[stat.stat.name]}; stroke: #000; stroke-width: 3px; font-size: 50; font-weight: bold; font-family: verdana'>
                ${stat.stat.name === 'special-attack' ? 'sp-attack'.toUpperCase() : stat.stat.name === 'special-defense' ? 'sp-defense'.toUpperCase() : stat.stat.name.toUpperCase()}
            </text>
        </svg>
    `;
    let stat_base = document.createElement('div');
    $(stat_name).css({ 'padding-left': '10px' }).addClass('d-flex');
    $(stat_base).text(stat.base_stat).css({ 'width': '100px', 'font-weight': '800' });
    $(stat_name).append(stat_base);
    $(stat_div).append(stat_name).addClass('d-flex justify-content-around');
    $("#pokemon_stats > .card-body").append(stat_div);
}

for (let ability of pokemon.ability) {
    let ability_div = document.createElement('div');
    let ability_name = document.createElement('span');
    $(ability_name).text(utils.capitalizeName(ability.ability.name)).addClass('card-font-format');
    $(ability_div).append(ability_name);
    if (ability.is_hidden === false) {
        if (pokemon.ability.length > 1 && $("#pokemon_ability > .card-body").children().length > 0) {
            $("#pokemon_ability > .card-body").append($("<hr>"));
        }
        $('#pokemon_ability > .card-body').append(ability_div);
    } else {
        $('#pokemon_hidden_ability > .card-body').append(ability_div);
    }
}
