import { formatPokemonName } from '/utils.js';
import { getPokemonTypeImage } from '/pokemonObjectDetails.js';

class Pokemon{
    constructor({ id, name, types : type, sprites : image, stats, abilities: ability, moves, height, weight, sprites }, evolChain, {genera: description, egg_groups, gender_rate: gender}) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.height = height;
        this.weight = weight;
        this.gender = gender;
        this.type = type;
        this.image = image['front_default'];
        this.stats = stats;
        this.ability = ability;
        this.moves = moves;
        this.evolChain = evolChain;
        this.egg_groups = egg_groups;
        this.sprites = sprites;
    }

    get id() {
        return this._id;
    }
    set id(pokeid) {
        this._id = pokeid;
    }

    get name() {
        return this._name;
    }
    set name(pokename) {
        this._name = formatPokemonName(pokename);
    }

    get description() {
        return this._description;
    }
    set description(pokedescription) {
        this._description = pokedescription[7].genus;
    }

    get height() {
        return this._heigth;
    }
    set height(pokeheight) {
        this._heigth = pokeheight;
    }

    get weight() {
        return this._weight;
    }
    set weight(pokeweight) {
        this._weight = pokeweight;
    }

    get gender() {
        return this._gender;
    }
    set gender(pokegender) {
        let female = (Number(pokegender) / 8) * 100;
        let male = 100 - female;
        this._gender = { female: female, male: male };
    }

    get type() {
        return this._type;
    }
    set type(poketype) {
        this._type = getPokemonTypeImage(poketype);
    }

    get image() {
        return this._image;
    }
    set image(pokeimage) {
        this._image = pokeimage;
    }

    get stats() {
        return this._stats;
    }
    set stats(pokestats) {
        this._stats = pokestats;
    }

    get ability() {
        return this._ability;
    }
    set ability(pokeability) {
        this._ability = pokeability;
    }

    get moves() {
        return this._moves;
    }
    set moves(pokemoves) {
        this._moves = pokemoves;
    }

    get evolChain() {
        return this._evolChain;
    }
    set evolChain({ chain }) {
        this._evolChain = {};
        this._evolChain[chain.species.name] = {};
        this._evolChain[chain.species.name]['url'] = chain.species.url;
        for (let evol of chain['evolves_to']) {
            this._evolChain[evol.species.name] = {};
            this._evolChain[evol.species.name]['url'] = evol.species.url;
            this._evolChain[evol.species.name]['evolution_details'] = evol['evolution_details'];
            for (let evol2 of evol['evolves_to']) {
                this._evolChain[evol2.species.name] = {};
                this._evolChain[evol2.species.name]['url'] = evol2.species.url;
                this._evolChain[evol2.species.name]['evolution_details'] = evol2['evolution_details'];
            }
        }
        //this.setEvolution(chain);
    }

    get evolution() {
        return this._evolution;
    }
    get pre_evolution() {
        return this._pre_evolution;
    }
    setEvolution({ evolves_to }) {
        const urlSpecie = 'https://pokeapi.co/api/v2/pokemon-species/';
        this._evolution = [];
        this._pre_evolution = [];
        const this_index = this._evolChain.findIndex(el => el === `${urlSpecie}${this.id}/`);
        this._evolution = this._evolChain.slice(this_index + 1);
        this._pre_evolution = this._evolChain.slice(0, this_index);
    }

    get sprites() {
        return this._sprites;
    }
    set sprites(pokesprites) {
        this._sprites = pokesprites;
    }
}

export async function pokemonFactory(source) {
    const apiPokemon = /https:\/\/pokeapi.co\/api\/v2\/pokemon\/\w+\//;
    const apiSpecie = /https:\/\/pokeapi.co\/api\/v2\/pokemon-species\/[0-9]+\//;
    const urlPokemon = 'https://pokeapi.co/api/v2/pokemon/';
    const urlSpecie = 'https://pokeapi.co/api/v2/pokemon-species/';
    const urlEvolChain = 'https://pokeapi.co/api/v2/evolution-chain/';

    let pokemon = null;
    let specie = null;
    let evolChain = null;

    if (apiPokemon.test(source)) {
        pokemon = await $.getJSON(source);
    } else if (apiSpecie.test(source)) {
        specie = await $.getJSON(source);
        const id = specie.id;
        pokemon = await $.getJSON(`${urlPokemon}${id}/`);
    } else {
        const url = `${urlPokemon}${source}/`;
        pokemon = await $.getJSON(url);
    }

    if (!specie) {
        specie = await $.getJSON(`${urlSpecie}${pokemon.id}/`);
    }

    evolChain = await $.getJSON(specie['evolution_chain'].url);

    return new Pokemon(pokemon, evolChain, specie);
}