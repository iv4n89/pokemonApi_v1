import * as pokemonDetails from '/pokemonObjectDetails.js';
import * as utils from '/utils.js';

$(document).ready(() => {
    (function fillTypesMenu() {
        const typeMenu = $(".type_selector_menu");
        const typesKeys = Object.keys(pokemonDetails.typesObj);
        for (let type_ of typesKeys) {
            let typeInner = `
                <img src="${pokemonDetails.typesObj[type_].image}" alt="${pokemonDetails.typesObj[type_].name.en}" data-type="${type_}"/> ${utils.capitalizeName(pokemonDetails.typesObj[type_].name.en)}`;
            let type = $(`<a class="dropdown-item type_selector" data-type="${type_}" href="/index.html?type=${type_}">${typeInner}</a>`);
            $(typeMenu).append(type);
        }
    })();
    search_a_pokemon();
});

const pokeSearch = document.getElementById("poke-search");

function search_a_pokemon() {
    const button = document.getElementById("poke-search-button");
    $(button).click(e => {
        e.preventDefault();
        const pokemon = pokeSearch.value;
        let url = ``;
        if (Number.isNaN(pokemon)) {
            url = `/pokemonDetails.html?name=${pokemon.toLowerCase()}`;
        } else {
            url = `/pokemonDetails.html?id=${pokemon}`;
        }
        window.location.href = url;
    });
}