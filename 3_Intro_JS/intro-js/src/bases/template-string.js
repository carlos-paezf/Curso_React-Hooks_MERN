const nombre = 'David'
const apellido = 'Ferrer'


const nombreCompleto = nombre + ' ' + apellido
console.log(nombreCompleto)


const nombreCompletoTemplateString = `${nombre} ${apellido}`
console.log(nombreCompletoTemplateString)


const numeroEnTemplateString = `${5 * 63}`
console.log(numeroEnTemplateString)


function getSaludo(nombre) {
    return 'Hola ' +  nombre
}
console.log(`Función: ${getSaludo(nombre)}`)
