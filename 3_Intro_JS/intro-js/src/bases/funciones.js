function saludar(nombre) {
    return `Hola ${nombre}`
}

saludar('David')        // 'Hola David'

saludar = 30
console.log(saludar)    // 30


const saludarArrowFunction = (nombre) => {
    return `Hola ${nombre}`
}

saludarArrowFunction('Ferrer')          // 'Hola Ferrer'

saludarArrowFunction = 40
console.log(saludarArrowFunction)       // Assignment to constant variable


/* const getUser = () => {
    return {
        uid: 123,
        username: "ferrer"
    }
} */

const getUser = () => ({
    uid: 123,
    username: "ferrer"
})
