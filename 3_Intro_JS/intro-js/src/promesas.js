import { getHeroById } from "./bases/import_export";


const getHeroePorID = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const heroe = getHeroById(id)
            heroe ?? reject('No se encontrĂ³ el heroe')
            resolve(heroe)
        }, 2000);
    })
}


getHeroePorID(34)
    .then(hero => console.log('then de la promesa:', hero))
    .catch(console.warn)