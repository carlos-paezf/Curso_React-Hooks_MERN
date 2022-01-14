# Sección 3: Introducción a JavaScript moderno

- Generar la base sobre JavaScript
- Constantes y variables Let
- Template String
- Objetos literales
- Arreglos
- Desestructruación * (sumamente importante)
- Promesas
- Fetch API
- Ternarios
- Async - Await

El objetivo aquí, es tener las bases que nos ayudan a diferenciar fácilmente qué es propio de React y qué es propio de JavaScript. Estos conceptos y ejercicios nos ayudarán a suavizar la curva de aprendizaje de React.

## Inicio del proyecto - Bases de JavaScript

Vamos a crear un proyecto de React. Lo primero será comprobar que tengamos instalado npx con el comando `npx --version`. Luego creamos el proyecto de React con `npx create-react-app intro-js`, luego ingresamos al directorio que nos genera y escribimos el comando `yarn start` o `npm start`. Por el momento vamos a dejar solo el archivo `index.js` vacio, de la carpeta `src`, los demás files los eliminamos.

## Variables y constantes

Evitemos usar `var`, es recomendable usar `let` y `const`, ya que nos permiten tener un scope de cada variable. Además en el caso sel `const` el valor es inmutable, mientras que `let` nos permite modificar su valor tomando el cuenta el scope:

```js
const nombre = 'Ferrer'

let valorDado = 5
valorDado = 2

console.log({ nombre, valorDado })      // { nombre: 'Ferrer', valorDado: 2 }

if (true) {
  let valorDado = 6
  console.log({ valorDado })            // { valorDado: 6 }
}

console.log({ valorDado })              // { valorDado: 2 }
```

## Template String

```js
const nombre = 'David'
const apellido = 'Ferrer'


const nombreCompleto = nombre + ' ' + apellido
console.log(nombreCompleto)                         // David Ferrer


const nombreCompletoTemplateString = `${nombre} ${apellido}`
console.log(nombreCompletoTemplateString)           // David Ferrer


const numeroEnTemplateString = `${5 * 63}`
console.log(numeroEnTemplateString)                 // 315


function getSaludo(nombre) {
    return 'Hola ' +  nombre
}
console.log(`Función: ${getSaludo(nombre)}`)        // Función: Hola David
```

## Objetos literales

Podemos tener un objeto, o diccionario como se llama en Python, de la siguiente manera:

```js
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
```

Podemos copiar la referencia de un objeto, es decir su espacio en memoria, aunque esto puede generar falsos positivos, es decir cambiar una propiedad del objeto original y no notarlo en el momento de la secuencia de ejecución:

```js
const persona2 = persona
console.log(persona2)
```

Una manera de evitar los falsos positivos es mediante el operador spread. Con ello evitamos la referencia al objeto:

```js
const persona3 = { ...persona }
console.log(persona3)
```

## Arreglos

```js
const arreglo = [1, 2, 3, 4]


let arreglo2 = [...arreglo]
arreglo2 = [...arreglo2, 5]


const arreglo3 = arreglo2.map(e => e * 3)


console.log(arreglo)        // [1, 2, 3, 4]
console.log(arreglo2)       // [1, 2, 3, 4, 5]
console.log(arreglo3)       // [3, 6, 9, 12, 15]
```

## Funciones

```js
function saludar(nombre) {
    return `Hola ${nombre}`
}

saludar('David')        // 'Hola David'

saludar = 30
console.log(saludar)    // 30


/* const saludarArrowFunction = (nombre) => {
    return `Hola ${nombre}`
} */

const saludarArrowFunction = (nombre) => `Hola ${nombre}`


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
```

## Desestructuración de objetos

```js
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
```

## Desestructuración de Arreglos

```js
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
```

## Import, export y funciones comunes de arreglos

```js
export const heroes = [ ]
```

```js
import { heroes } from './data/heroes'


const getHeroById = (id) => {
    return heroes.find(e => e.id === id)
}

const hero = getHeroById(2)
console.log(hero)


const getHeroByOwner = (owner) => {
    return heroes.filter(e => e.owner === owner)
}

const heroesOwner = getHeroByOwner('DC')
console.log(heroesOwner)
```

## Múltiples exportaciones, y exportaciones por defecto

Las exportaciones por defecto tienen este aspecto:

```js
export default [ ]
```

Para usar las exportaciones por defecto, ponemos un alias en la importación:

```js
import heroes from './data/heroes'
```

Otro tipo de exportación por defecto sería:

```js
const heroes = []

export default heroes
```

Si queremos una exportación por defecto y una individual...

```js
export const owners = [...]

export default heroes
```

... podemos importar de esta manera:

```js
import heroes, { owners } from './data/heroes'
```

Para exportaciones múltiples:

```js
export {
    heroes, 
    owners
}
```

Importamos así:

```js
import { heroes, owners } from './bases/data/heroes'
```

También podemos exportar así:

```js
export {
    heroes as default, 
    owners
}
```

E importar así:

```js
import heroes, { owners } from './data/heroes'
```

## Promesas

```js
import { getHeroById } from "./bases/import_export";


const getHeroePorID = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const heroe = getHeroById(id)
            heroe ?? reject('No se encontró el heroe')
            resolve(heroe)
        }, 2000);
    })
}


getHeroePorID(34)
    .then(hero => console.log('then de la promesa:', hero))
    .catch(console.warn)
```

## Fetch API

```js
const api_key = `UMxyzmG7A4NAsIH4vzodoaeu88tZRouC`

const baseURL = `https://api.giphy.com/v1/gifs/random?api_key=${api_key}`

const petición = fetch(baseURL)

petición
    .then(res => res.json())
    .then(({ data }) => {
        const { url } = data.images.original
        const img = document.createElement('img')
        img.src = url
        document.body.append(img)
    })
    .catch(console.warn)
```

## Async - Await

```js
const api_key = `UMxyzmG7A4NAsIH4vzodoaeu88tZRouC`
const baseURL = `https://api.giphy.com/v1/gifs/random?api_key=${api_key}`


const getImage = async () => {
    try {
        const peticion = await fetch(baseURL)
        const { data } = await peticion.json()
        const { url } = data.images.original
        const img = document.createElement('img')
        img.src = url
        document.body.append(img)
    } catch (error) {
        console.warn(error)
    }
}

getImage()
```

## Operador condicional ternario

```js
const active = true

let mensaje = ''


if (active) {
    mensaje = 'activo'
} else {
    mensaje = 'Inactivo'
}
console.log(mensaje)


const message = (active) ? 'Active' : 'Inactive'
console.log(message)


const msg = (active) && 'Activo'
console.log(msg)
```
