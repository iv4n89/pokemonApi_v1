import * as utils from '/utils.js';

export const typesObj = {
    electric: {
        name: {
            es: 'eléctrico',
            en: 'electric'
        },
        color: '#ffcc33',
        image: '/images/types/en/electric.gif'
    },
    normal: {
        name: {
            es: 'normal',
            en: 'normal'
        },
        color: '#bbbbaa',
        image: '/images/types/en/normal.gif'
    },
    fire: {
        name: {
            es: 'fuego',
            en: 'fire'
        },
        color: '#ff4422',
        image: '/images/types/en/fire.gif'
    },
    water: {
        name: {
            es: 'agua',
            en: 'water'
        },
        color: '#3399ff',
        image: '/images/types/en/water.gif'
    },
    ice: {
        name: {
            es: 'hielo',
            en: 'ice'
        },
        color: '#77ddff',
        image: '/images/types/en/ice.gif'
    },
    rock: {
        name: {
            es: 'roca',
            en: 'rock'
        },
        color: '#bbaa66',
        image: '/images/types/en/rock.gif'
    },
    flying: {
        name: {
            es: 'volador',
            en: 'flying'
        },
        color: '#6699ff',
        image: '/images/types/en/flying.gif'
    },
    grass: {
        name: {
            es: 'planta',
            en: 'grass'
        },
        color: '#77cc55',
        image: '/images/types/en/grass.gif'
    },
    psychic: {
        name: {
            es: 'psíquico',
            en: 'phychic'
        },
        color: '#ff5588',
        image: '/images/types/en/psychic.gif'
    },
    ghost: {
        name: {
            es: 'fantasma',
            en: 'ghost'
        },
        color: '#555599',
        image: '/images/types/en/ghost.gif'
    },
    bug: {
        name: {
            es: 'bicho',
            en: 'bug'
        },
        color: '#aabb22',
        image: '/images/types/en/bug.gif'
    },
    poison: {
        name: {
            es: 'veneno',
            en: 'poison'
        },
        color: '#aa5599',
        image: '/images/types/en/poison.gif'
    },
    ground: {
        name: {
            es: 'tierra',
            en: 'ground'
        },
        color: '#ddbb55',
        image: '/images/types/en/ground.gif'
    },
    dragon: {
        name: {
            es: 'dragón',
            en: 'dragon'
        },
        color: '#7766dd',
        image: '/images/types/en/dragon.gif'
    },
    steel: {
        name: {
            es: 'acero',
            en: 'steel'
        },
        color: '#aaaabb',
        image: '/images/types/en/steel.gif'
    },
    fighting: {
        name: {
            es: 'lucha',
            en: 'fighting'
        },
        color: '#bb5544',
        image: '/images/types/en/fighting.gif'
    },
    dark: {
        name: {
            es: 'siniestro',
            en: 'dark'
        },
        color: '#242423',
        image: '/images/types/en/dark.gif'
    },
    fairy: {
        name: {
            es: 'hada',
            en: 'fairy'
        },
        color: '#ffaaff',
        image: '/images/types/en/fairy.gif'
    }
};

const statsObj = {
    es: {
        hp: 'Hp',
        attack: 'Ataque',
        defense: 'Defensa',
        "special-attack": 'Ataque especial',
        "special-defense": 'Defensa especial',
        speed: 'Velocidad'
    },
    en: {
        hp: 'Hp',
        attack: 'Atack',
        defense: 'Defense',
        "special-attack": 'Special-attack',
        "special-defense": 'Special-defense',
        speed: 'Speed'
    }
}

export const getPokemonTypes = (types, language) => {
    return types.length > 1 ? `${utils.capitalizeName(typesObj[types[0].type.name].name[language])}  ${utils.capitalizeName(typesObj[types[1].type.name].name[language])}` : `${utils.capitalizeName(typesObj[types[0].type.name].name[language])}`;
}

export const getPokemonTypeImage = (types) => {
    const divComponent = [];
    divComponent.classList = 'type_div';
    for (let type of types) {
        let div = document.createElement('div');
        let imgComponent = document.createElement("img");
        imgComponent.classList = 'type_img';
        imgComponent.src = typesObj[type.type.name].image;
        div.appendChild(imgComponent);
        div['data-type-name'] = type.type.name;
        divComponent.push(div);
    }
    return divComponent;
}

export const getPokemonImg = ({ name }) => {
    const specialNames = ['nidoran-m', 'mr-mime', 'ho-oh', 'mime-jr', 'type-null', 'jangmo-o', 'hakamo-o', 'kommo-o', 'tapu-koko', 'tapu-lele', 'tapu-bulu', 'tapu-fini', 'mr-rime'];
    //return `https://pokeres.bastionbot.org/images/pokemon/${pokemonId}.png`;
    if (name.includes('-') && !specialNames.includes(name.toLowerCase())) name = name.split('-')[0];
    if (specialNames.includes(name.toLowerCase())) name = name.split('-').join('');
    return `http://play.pokemonshowdown.com/sprites/xyani/${name.toLowerCase()}.gif`;
}

export const fetchPokemonDetails = async pokemon => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    const res = await fetch(url);
    return await res.json();
}

export const getStatsName = (stat) => {
    const language = navigator.language.slice(0, 2);
    return statsObj[language][stat];
}