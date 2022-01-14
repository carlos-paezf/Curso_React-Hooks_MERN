const persona = {
    nombre: 'Tony',
    apellido: 'Stark',
    edad: 45,
    dirección: {
        ciudad: 'New York'
    }
}

console.log(persona)            // { nombre: 'Tony', apellido: 'Stark, ..., 'dirección': { ciudad: 'New York' } }
console.log(persona.nombre)     // Tony
console.log(persona.trajes?.length)     // undefined


const persona2 = persona
console.log(persona2)


const persona3 = { ...persona }
console.log(persona3)