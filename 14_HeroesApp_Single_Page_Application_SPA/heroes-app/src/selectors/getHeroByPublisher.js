import { heroes } from '../data/heroes'


/**
 * Given a publisher, return a list of all the heroes that belong to that publisher.
 * @param publisher - The publisher of the hero.
 * @returns The array of heroes that match the publisher.
 */
export const getHeroByPusblisher = (publisher) => {
    const validPublishers = ['DC Comics', 'Marvel Comics']

    if (!validPublishers.includes(publisher)) {
        throw new Error(`${publisher} is nota a valid publisher`)
    }

    return heroes.filter(hero => hero.publisher === publisher)
}