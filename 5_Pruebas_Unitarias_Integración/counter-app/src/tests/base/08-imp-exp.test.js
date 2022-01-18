import { getHeroeById, getHeroesByOwner } from "../../base/08-imp-exp"
import { heroes } from "../../data/heroes"

describe('Pruebas en 08-imp-exp.js', () => {
    test('Debe retornar un héroe por id', () => {
        const id = 1
        const heroe = getHeroeById(id)

        const heroeData = heroes.find(hero => hero.id === id )

        expect(heroe).toEqual(heroeData)
    })
    
    test('Debe retornar undefined si el héroe no existe', () => {
        const id = 10
        const heroe = getHeroeById(id)

        expect(heroe).toBe(undefined)
    })

    test('Debe retornar los héroes de DC', () => {
        const owner = 'DC'
        const heroesDC = heroes.filter(h => h.owner === owner)

        const heroesResult = getHeroesByOwner(owner)

        expect(heroesResult).toEqual(heroesDC)
    })

    test('Debe retornar los héroes de Marvel y ser un arreglo de 2 elementos', () => {
        const owner = 'Marvel'
        const heroesMarvel = heroes.filter(h => h.owner === owner)

        const heroesResult = getHeroesByOwner(owner)

        expect(heroesResult).toEqual(heroesMarvel)
        expect(heroesResult.length).toBe(2)
    })

    test('Deberia retonar', () => {
        const owner = 'Humm'

        const heroesResult = getHeroesByOwner(owner)

        expect(heroesResult).toEqual([])
        expect(heroesResult.length).toBe(0)
    })
})
