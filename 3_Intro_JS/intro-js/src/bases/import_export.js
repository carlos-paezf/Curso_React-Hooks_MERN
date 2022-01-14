import { heroes, owners } from './data/heroes'


console.log(owners)


export const getHeroById = (id) => {
    return heroes.find(e => e.id === id)
}

const hero = getHeroById(2)
console.log(hero)


export const getHeroByOwner = (owner) => {
    return heroes.filter(e => e.owner === owner)
}


const heroesOwner = getHeroByOwner('DC')
console.log(heroesOwner)

