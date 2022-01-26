import { heroes } from "../data/heroes"

/**
 * Given a name, return a list of heroes whose name contains that name.
 * @param [name] - The name of the hero to search for.
 * @returns The array of heroes that match the name.
 */
export const getHeroByName = (name = '') => {
    if (name === '') return []
    name = name.toLowerCase()
    return heroes.filter(hero => hero.superhero.toLowerCase().includes(name))
}
