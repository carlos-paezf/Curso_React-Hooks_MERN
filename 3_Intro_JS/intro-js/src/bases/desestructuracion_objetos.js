const persona = {
    nombre: 'Tony',
    apellido: 'Stark',
    edad: 45
}


const { edad, apellido, nombre: nombreHero } = persona
console.log({ nombreHero, apellido, edad })



const getHero = ({ nombre, rango = 'soldado' }) => {
    console.log({ nombre, rango })
    return {
        name: nombre,
        rango,
        latlng: {
            lat: 1111,
            lng: 1212
        }
    }
}

const { name, rango, latlng: { lat, lng } } = getHero(persona)
console.log({ name, rango })
console.log({ lat, lng })