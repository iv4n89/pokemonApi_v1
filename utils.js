export const capitalizeName = name => {
    return name[0].toUpperCase() + name.slice(1);
}

export const formatPokemonName = name => {
    const specialNames = ['nidoran-m', 'mr-mime', 'ho-oh', 'mime-jr', 'type-null', 'jangmo-o', 'hakamo-o', 'kommo-o', 'tapu-koko', 'tapu-lele', 'tapu-bulu', 'tapu-fini', 'mr-rime'];
    return  specialNames.includes(name) ? capitalizeName(name) : capitalizeName(name).split('-')[0];
}
