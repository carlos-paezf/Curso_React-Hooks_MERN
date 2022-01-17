# Sección 4: Primeros pasos en React

- Nuestra primera aplicación - Hola Mundo
- Exposiciones sobre los componentes
- Creación de componentes (Functional Components)
- Propiedades - Props
- Impresiones en el HTML
- PropTypes
- DefaultProps
- Introducción general a los Hooks
- useState

Es una sección importante, especialmente para todos los que están empezando de cero en React, ya que dará las bases de cómo segmentar la lógica de nuestra aplicación en pequeñas piezas más fáciles de mantener.

## ¿Que son los componentes?

Un componente es una pequeña pieza de código encapsulada re-utilizable que puede tener estado o no.

## Primera aplicación de React

Vamos a crear un nuevo proyecto de React con el comando `npx create-react-app counter-app`, luego nos dirigimos al directorio que se genera y usamos el comando `npm start` o `yarn start` para levantar la aplicación en un navegador.

## Estructura de directorios

Un proyecto nuevo de React se compone de los `node_modules` para las librerías de terceros que nos permiten ejecutar el proyecto en desarrollo, no todo se sube a producción. Luego pasamos a la carpeta `public`, en el cual tenemos el archivo `index.html` donde tenemos el div a donde apuntamos lo que hagamos, y dentro del directorio también tenemos iconos y un archivo llamado `manifest.json` para configurar PWA (Progressive Web Application). El directorio `src` es donde tenemos toda la lógica de nuestra aplicación: componentes, hooks, helpers... El archivo `.gitignore` nos permite no darle seguimiento en el repositorio a directorios o archivos específicos. `package.json` tiene los comandos de react-scripts e información sobre los paquetes de node.

## Contenido de la carpeta `src`

La carpeta `src` o *source*, contiene los archivos de css, los test, el archivo del componente principal, en archivo `index.js` donde se establece la renderización con React. Los services workers sirven para crear una aplicación web progresiva (PWA).

## Hola Mundo en React

Como es el primer proyecto que vamos a manejar con React puramente, eliminamos todos los archivos de la carpeta `src` y creamos un archivo `index.js` en donde hacemos las importaciones de `React` para el manejo de JSX y de `ReactDOM` para poder renderizar el contenido dentro del DOM del documento.

```js
import React from 'react'
import ReactDOM from 'react-dom'


const saludo = <h1>Hola mundo</h1>
const divRoot = document.querySelector('#root')


ReactDOM.render(saludo, divRoot)
```

## Nuestro primer componente

En React tenemos 2 clases de componentes, los basados en clases y los que se basan en funciones llamados Functional Components, y es la manera en la que React quiere que los desarrolladores usen por estándar. Vamos a crear un archivo con la extensión `.jsx` para crear nuestro primer componente:

```jsx
import React from 'react'

const PrimeraApp = () => {
    return <h1>Hola mundo</h1>
}

export default PrimeraApp
```

Dentro del archivo `index.js` llamamos nuestro componente de la siguiente manera:

```js
import React from 'react'
import ReactDOM from 'react-dom'

import PrimeraApp from './PrimeraApp'


const divRoot = document.querySelector('#root')


ReactDOM.render(<PrimeraApp />, divRoot)
```

Creamos un archivo llamado `index.css` con el siguiente contenido, el cual es recomendable que esté alfabéticamente:

```css
html,
body {
    background-color: #21232a;
    color: white;
    font-family: "Helvetica Neue", Arial, Helvetica, sans-serif;
    font-size: 1.3rem;
    padding: 70px;
}
```

Para poder usar dicho archivo, dentro de `index.js` lo llamamos de la siguiente manera:

```js
import './index.css'
```

## Retorna elementos en el Componente - Fragment

Es importante saber que los componente solo pueden retornar un elemento u objeto a la vez, por lo tanto si la lógica de nuestro componente es amplia, usamos paréntesis `()` al retornar algo:

```jsx
import React from 'react'

const PrimeraApp = () => {
    return ( 
        <h1>Hola mundo</h1>
        <p>Mi primera aplicación</p>
    )
}

export default PrimeraApp
```

También podemos usar `React.Fragment` para contener los elementos en uno solo, para evitar atrapar todo en un `div` que se puede considerar innecesario:

```jsx
import React, { Fragment } from 'react'

const PrimeraApp = () => {
    return (
        <Fragment>
            <h1>Hola mundo</h1>
            <p>Mi primera aplicación</p>
        </Fragment>
    )
}

export default PrimeraApp
```

Una manera corta de usar fragment es mediante las etiquetas `<></>`:

```jsx
import React from 'react'

const PrimeraApp = () => {
    return (
        <>
            <h1>Hola mundo</h1>
            <p>Mi primera aplicación</p>
        </>
    )
}

export default PrimeraApp
```

## Impresión de variables en HTML

Para imprimir variables o expresiones JS dentro de un componente de react, usamos `{}` dentro de las etiquetas en donde queremos mostrarlo:

```jsx
const PrimeraApp = () => {

    const saludo = 'Hola mundo - const'

    return (
        <>
            <p>{ saludo }</p>
        </>
    )
}
```

Las variables booleanas, ni los objetos los muestra en el DOM. Para poder mostrar su valor usamos `JSON.stringify()`:

```jsx
const PrimeraApp = () => {

    const saludo = 'Hola mundo - const'
    const bool = true
    const persona = {
        nombre: 'David',
        apellido: 'Ferrer',
        edad: 21
    }

    return (
        <>
            <h1>Hola mundo</h1>
            <p>{ saludo }</p>
            <pre>{ JSON.stringify(bool) }</pre>
            <pre>{ JSON.stringify(persona) }</pre>
        </>
    )
}
```

## Comunicación entre componentes - Props

Las propiedades o properties son la manera en que se comunican los componentes. Para enviar un prop a un componente lo hacemos de la siguiente manera:

```jsx
ReactDOM.render(
    <PrimeraApp nombre="David" />, divRoot
)
```

Y nuestro componente lo recibe y usa de esta manera:

```jsx
const PrimeraApp = (props) => {
    ...
    return (
        <>
            <h1>Bienvenido { props.nombre }</h1>
            ...
        </>
    )
}
```

Como nos damos cuenta, props es un objeto, por lo que podemos aplicar desestructuración incluso para poner valores por defecto:

```jsx
const PrimeraApp = ({ nombre = 'nn' }) => {
    ...
    return (
        <>
            <h1>Bienvenido { nombre }</h1>
            ...
        </>
    )
}
```

## PropTypes

Nosotros podemos validar que elementos se ingresan por las propiedades, si son requeridos o no, y de que tipo debe ser la propiedad.

```jsx
import PropTypes from 'prop-types'

const PrimeraApp = ({ nombre }) => {
    ...
}

PrimeraApp.propTypes = {
    nombre: PropTypes.string.isRequired
}
```

## DefaultProps

Una manera de dejar un valor por defecto a una prop, es de la siguiente manera:

```jsx
const PrimeraApp = ({ ..., apellido = 'nn' }) => {
    ...
}
```

Pero, existe otra manera mediante los `PropTypes`:

```jsx
import PropTypes from 'prop-types'

const PrimeraApp = ({ nombre, apellido }) => {
    ...
}
...

PrimeraApp.defaultProps = {
    apellido: 'nn'
}
```

## Componente CounterApp

- Tarea:

    1. Crear un nuevo componente dentro de la carpeta `src` llamado `CounterApp`
    2. El `CounterApp` debe de ser un ***Functional Component***
    3. El contenido del `CounterApp` debe de ser:

        ```html
        <h1>CounterApp</h1>
        <h2> { value } </h2>
        ```

    4. Donde `value` es una propiedad enviada desde el padre hacia el componente `<CounterApp />` (Debe ser numérica validada con PropTypes).
    5. Reemplazar en el `index.js` el componente de `<PrimeraApp />` por el componente `<CounterApp />` (no se olviden del value que debe de ser un número).
    6. Asegúrense de no tener errores ni warnings (Cualquier warning no usado, comentar el código)

- Solución:

    Para crear un componente con props más rápido usamos el snippet `racfp` provisto por la extensión *ES7 React/Redux/GraphQL/React-Native snippets*

    ```jsx
    import React from 'react'
    import PropTypes from 'prop-types'

    const CounterApp = ({ value }) => {
        return (
            <>
                <h1>CounterApp</h1>
                <h2>{ value }</h2>
            </>
        )
    }

    CounterApp.propTypes = {
        value: PropTypes.number.isRequired
    }

    export default CounterApp
    ```

    ```js
    import CounterApp from './CounterApp'
    ...
    ReactDOM.render(
        <React.StrictMode>
            <CounterApp value={ 12345 } />
        </React.StrictMode>, 
        divRoot
    )
    ```

## Evento click (Eventos en general)

Dentro de la documentación de react tenemos diversos eventos que podemos usar, a todo el conjunto se le llama [SyntheticEvent](https://es.reactjs.org/docs/events.html). Vamos a crear un botón y le daremos una funcionalidad al evento `onClick`:

```jsx
const CounterApp = ({ value }) => {
    return (
        <>
            ...
            <button onClick={(e) => { console.log(e) }}>+ 1</button>
        </>
    )
}
```

Otra manera de hacer lo anterior, es sacando la función y pasandole el evento por parámetro.

```jsx
const CounterApp = ({ value }) => {

    const handleAdd = (event) => {
        console.log(event)
    }

    return (
        <>
            ...
            <button onClick={(e) => { handleAdd(e) }}>+ 1</button>
        </>
    )
}
```

Una manera aún mas sencilla es llamando la referencia a la función:

```jsx
const CounterApp = ({ value }) => {

    const handleAdd = (event) => {
        console.log(event)
    }

    return (
        <>
            <h1>CounterApp</h1>
            <h2>{ value }</h2>

            <button onClick={handleAdd}>+ 1</button>
        </>
    )
}
```

Pero, la manera que debemos evitar en este caso es llamando la función completa, puesto que está misma se va a ejecutar en el momento que se renderiza el componente, y no cuando ocurre el método:

```jsx
const CounterApp = ({ value }) => {

    const handleAdd = (event) => {
        console.log(event)
    }

    return (
        <>
            <h1>CounterApp</h1>
            <h2>{ value }</h2>

            <button onClick={handleAdd()}>+ 1</button>
        </>
    )
}
```

## useState - Hook

Un hook es simplemente una función. Vamos a usar el hook `useState()`:

```jsx
import { useState } from 'react'

const CounterApp = ({ value }) => {
    const state = useState('number')
    ...
    return (
        <>
            ...
            <pre>{ JSON.stringify(state) }</pre>
        </>
    )
}
```

Lo que vamos a obtener de dicho estado es lo siguiente: `["number",null]`. El primer argumento es el valor inicial, el segundo es una función que nos permite alterar su estado. Para poder usar ambos argumentos, usamos la siguiente desestructuración:

```jsx
const CounterApp = ({ value }) => {
    const [state, setState] = useState('number')
    ...
    return (
        <>
            ...
            <pre>{ JSON.stringify(state) }</pre>
            <pre>{ JSON.stringify(setState) }</pre>
        </>
    )
}
```

Por ejemplo queremos un contador y cada que se le da click cambiar su valor en 1. Para ello necesitamos definir el cambio del estado mediante la función del segundo argumento del `useState`, de lo contrario no podemos hacer alterar el valor del counter:

```jsx
const CounterApp = ({ value }) => {

    const [counter, setCounter] = useState(0)

    const handleAdd = (event) => {
        setCounter(counter + 1)
    }

    return (...)
}
```

Si nosotros intentamos en vez de lo anterior, usar esta expresión: `setCounter(counter++)` nos saldrá un error, pues se está cambiando el valor de una constante. React nos insta a no mutar el state de esta manera. Una expresión que si podemos usar, es la siguiente: `setCounter(prev => prev  + 1)`.

## handleSubtract y handleReset

Vamos a crear una función para restarle al contador y otra función para hacer un reset el valor del contador al valor ingresado por los props del componente. Para hacer el reset tenemos 2 opciones. Además por el momento no vamos a interactuar con los eventos, por lo que los ignoramos en los métodos:

```jsx
const CounterApp = ({ value }) => {
    const [counter, setCounter] = useState(value)

    const handleAdd = (event) => setCounter(prev => prev  + 1)

    const handleSubtract = () => setCounter(counter - 1)

    const handleReset = () => setCounter(value)
    // const handleReset = () => setCounter(prev => prev = value)


    return (
        <>
            <h1>CounterApp</h1>
            <h2>{ counter }</h2>

            <button onClick={handleAdd}>+ 1</button>
            <button onClick={handleSubtract}>- 1</button>
            <button onClick={handleReset}>Reset</button>
        </>
    )
}
```
