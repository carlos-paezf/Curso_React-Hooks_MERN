const personajes = ['Superman', 'Batman', 'Linterna', 'Wonder Woman']

const [sm, , , ww] = personajes
console.log({ sm, ww })     // {sm: 'Superman', ww: 'Wonder Woman'}


const retornaArreglo = () => {
    return ['Abd', 123, '@#$%', '123k12312']
}

const [letras, , ...rest] = retornaArreglo()
console.log({ letras, rest })       // {letras: 'Abd', rest: Array(2)}


const useState = (value) => {
    return [ value, () => console.log('Holaa')]
}

// eslint-disable-next-line react-hooks/rules-of-hooks
const [nombre, setNombre] = useState('ferrer')
console.log(nombre)     // ferrer
setNombre()             // Holaa