# Sección 6: GifExpertApp - Aplicación

- Custom Hooks
- Fetch hacia un API
- Comunicación entre componentes
- Clases de CSS
- Animaciones
- Enviar métodos como argumentos
- Crear listados
- keys
- Giphy

Esta es una aplicación pequeña pero muy ilustrativa que explica cómo utilizar React + customHooks para poder resolver necesidades en específico que podremos re-utilizar después.

## Inicio del proyecto - GifExpertApp

Vamos a crear un nuevo proyecto con el comando `npx create-react-app gif-expert-app`, luego podemos levantar la aplicación con los comandos `npm start` o `yarn start`. Vamos a usar la apiKey de Giphy para poder hacer peticiones a dicho API.

## GifExpertApp - Component

Vamos a eliminar los archivos `App.js`, `App.css`, `App.test.js`, `logo,svg`, `reportWebVitals.js`. También vamos a limpiar el archivo `index.css`. Luego creamos un componente llamado `GifExpertApp.jsx`. Dicho componente lo llamamos en el archivo `index.js`:

```js
ReactDOM.render(
    <React.StrictMode>
        <GifExpertApp />
    </React.StrictMode>,
    document.getElementById('root')
);
```

En el archivo `index.css` creamos este pequeño estilo:

```css
* {
    font-family: Arial, Helvetica, sans-serif;
}

body {
    padding: 50px;
}
```

## Creando una lista de categorías

Vamos a usar el hook `useState` para tener un arreglo de categorías, los cuales luego renderizamos dentro de una lista ordenada mediante la función `map`, además de que cada elemento debe tener un key propio, por el momento solo ponemos por key el propio elemento, pero lo recomendable es que sea el key que regrese la base de datos. Es ideal que el key no sea el indice del elemento, y además debe ser único:

```jsx
const GifExpertApp = () => {

    const [categories, setCategories] = useState(['Humor', 'Sci-Fi', 'Shounen'])

    return (
        <>
            ...
            <ol>
                {
                    categories.map(category => <li key={category}>{category}</li>)
                }
            </ol>
        </>
    )
}
```

Luego creamos un botón para añadir un nuevo elemento dentro de la lista, para lo cual debemos tener una función que haga uso de `setCategories` para mutar el estado del arreglo:

```jsx
const GifExpertApp = () => {

    const [categories, setCategories] = useState(['Humor', 'Sci-Fi', 'Shounen'])

    const handleAdd = () => {
        const newElement = 'Super-Poderes'
        setCategories([...categories, newElement])
    }

    return (
        <>
            ...
            <button onClick={handleAdd}>Agregar</button>
            ...
        </>
    )
}
```

## Componente AddCategory

Vamos a crear un nuevo componente que se encargue de añadir una nueva categoría. Dicho componente lo creamos en la carpeta `components/AddCategory.jsx`. Dentro de dicho componente creamos una caja de texto para poder capturar el valor ingresado cada que cambia el valor del input:

```jsx
export const AddCategory = () => {

    const [inputValue, setInputValue] = useState('')

    const handleInputChange = (event) => {
        setInputValue(event.target.value)
    }    

    return <input type="text" value={inputValue} onChange={handleInputChange} />
}
```

La idea es tener la opción de enviar lo que se ingresa por el input, así que lo vamos a atrapar dentro de un formulario. Dicho form debe prevenir el refresh de la página cada que se envía, por lo que creamos una función para dicho control:

```jsx
export const AddCategory = () => {
    ...
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Form enviado')
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={inputValue} onChange={handleInputChange} />
        </form>
    )
}
```

## Comunicación entre componentes

Una manera de comunicarnos entre componentes, es mediante los props. Necesitamos que cada que activemos el evento `onSubmit` el componente hijo `<AddCategory />`, se mute el estado del componente padre `<GifExpertApp />`. Lo que vamos a hacer es desde el componente padre enviar la función `setCategories` dentro de los props del componente hijo:

```jsx
const GifExpertApp = () => {

    const [categories, setCategories] = useState(['Humor', 'Sci-Fi', 'Shounen'])

    return (
        <>
            <h2>GifExpertApp</h2>
            <AddCategory setCategories={setCategories} />
            <hr />
            ...
        </>
    )
}
```

Luego en el componente hijo recibimos el prop y lo usamos para añadir el valor ingresado por el input dentro del arreglo del componente padre, cada que se envié el formulario:

```jsx
export const AddCategory = ({ setCategories }) => {

    const [inputValue, setInputValue] = useState('')

    const handleInputChange = (event) => {
        setInputValue(event.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setCategories(c => [...c, inputValue])
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={inputValue} onChange={handleInputChange} />
        </form>
    )
}
```

Lo ideal es que el usuario no nos ingrese un valor vacío, por lo que hacemos la siguiente validación:

```jsx
export const AddCategory = ({ setCategories }) => {
    ...
    const handleSubmit = (e) => {
        e.preventDefault()
        if (inputValue.trim().length > 2) {
            setCategories(c => [...c, inputValue])
            setInputValue('')
        }
    }
    ...
}
```

Otra validación que debemos tener dentro de AddCategory es darle tipado a los props que se ingresan, en este caso queremos que el prop `setCategories` sea una función requerida:

```jsx
import PropTypes from 'prop-types'

export const AddCategory = ({ setCategories }) => { ... }

AddCategory.propTypes = {
    setCategories: PropTypes.func.isRequired
}
```

## Fetch API - Obtener las imágenes deseadas

Vamos a crear un nuevo componente que nos permita tener un grid de los valores ingresados con la respuesta de la API. En vez de renderizar el list item, vamos a renderizar dicho componente dentro del componente padre `<GifExpertApp />`.

```jsx
import { GifGrid } from './components'

const GifExpertApp = () => {
    ...
    return (
        <>
            ...
            <ol>
                {categories.map(category => <GifGrid key={category} category={category} />)}
            </ol>
        </>
    )
}
```

Luego creamos un método para poder hacer la petición a la api con el fin de traer los resultados de la búsqueda. Por el momento tenemos una búsqueda quemada, luego mejoramos el endpoint de la búsqueda. En vez de retornar toda la data que nos da la respuesta, creamos un objeto para poder retornar solo algunos elementos:

```jsx
export const GifGrid = ({ category }) => {

    const getGifs = async () => {
        const baseUrl = `https://api.giphy.com/v1/gifs/search?q=${'Rick and Morty'}&limit=10&api_key=UMxyzmG7A4NAsIH4vzodoaeu88tZRouC`
        const res = await fetch(baseUrl)
        const { data } = await res.json()

        const gifs = data.map(({ id, title, images }) => {
            return {
                id,
                title,
                url: images?.downsized_medium.url
            }
        })
        console.log(gifs)
    };

    getGifs()

    return (...)
}
```

## `useEffect()`

Nosotros debemos evitar que se realice la petición http cada que se hace un cambio dentro del componente. Solo queremos que se haga la petición cuando se llama el componente, cuando se presente un cambio significativo que deseamos controlar. Con esto en mente, usamos el hook `useEffect`, en el que pasamos la función o lógica al montar el componente, y un arreglo de dependencias para observar sus cambios y volver a la lanzar la lógica:

```jsx
export const GifGrid = ({ category }) => {
    ...
    useEffect(() => {
        getGifs()
    }, []);
    
    return (...)
}
```

## Mostrar los títulos de las imágenes

Vamos a crear un `useState` para almacenar las respuestas del fetch, y luego renderizamos el contenido obtenido dentro de una lista:

```jsx
export const GifGrid = ({ category }) => {

    const [images, setImages] = useState([]);

    const getGifs = async () => {
        ...
        setImages(gifs)
    };
    ...
    return (
        <>
            ...
            <ul>
                {images.map(({ id, title }) => <li key={id}>{title}</li>)}
            </ul>
        </>
    )
}
```

Teniendo en cuenta la idea de los componentes hijos, creamos un nuevo componente que será hijo de `GifGrid`, él cual servirá para poder recibir la información de los gif uno por uno:

```jsx
export const GifGridItem = ({ id, title, url }) => {
    return (
        <div>
            <img src={url} alt={title} />
            <p>{title}</p>
        </div>
    );
};
```

La manera en que llamamos dicho componente, es de la siguiente: Mapeamos el arreglo de imágenes, y por cada una llamamos el componente que acabamos de crear. Le damos a cada elemento un id, y luego enviamos una copia del contenido del elemento del array como props.

```jsx
export const GifGrid = ({ category }) => {
    ...
    return (
        <>
            ...
            {
                images.map(gif => <GifGridItem key={gif.id} {...gif} />)
            }
        </>
    )
}
```

## `className` - Clases de CSS

Por el momento vamos a usar el archivo `index.css` para los estilos generales de los componentes. Vamos a crear algunas clases de css dentro de dicho archivo:

```css
.card-grid {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.card {
    align-content: center;
    border: 1px solid gray;
    border-radius: 6px;
    margin-bottom: 10px;
    margin-right: 10px;
    overflow: hidden;
}

.card p {
    padding: 5px;
    text-align: center;
}

.card img {
    max-height: 170px;
}
```

Luego llamamos dichas clases en estos lugares:

```jsx
export const GifGrid = ({ category }) => {
    ...
    return (
        <>
            ...
            <div className='card-grid'>
                {...}
            </div>
        </>
    )
}
```

```jsx
export const GifGridItem = ({ id, title, url }) => {
    return (
        <div className="card">
            ...
        </div>
    );
};
```

## Helpers - `getGifs`

Dentro del componente `<GifGrid />` vamos a usar template string para convertir la categoría que se ingresa, en un valor valido de la URL con el método `encodeURI()`:

```jsx
export const GifGrid = ({ category }) => {
    ...
    const getGifs = async () => {
        const baseUrl = `https://api.giphy.com/v1/gifs/search?q=${encodeURI(category)}&limit=10&api_key=UMxyzmG7A4NAsIH4vzodoaeu88tZRouC`
        ...
    };
    ...
}
```

Al que vamos a hacer es sacar la función `getGifs` dentro de un nuevo archivo en la carpeta `helpers`, pero le hacemos algunos cambios: recibimos la categoría como parámetros y retornamos los gifs de la respuesta del endpoint:

```js
export const getGifs = async (category) => {
    const baseUrl = `https://api.giphy.com/v1/gifs/search?q=${encodeURI(category)}&limit=10&api_key=UMxyzmG7A4NAsIH4vzodoaeu88tZRouC`
    const res = await fetch(baseUrl)
    const { data } = await res.json()

    const gifs = data.map(({ id, title, images }) => {
        return {
            id,
            title,
            url: images?.downsized_medium.url
        }
    })
    return gifs
};
```

Regresamos al componente `<GifGrid />` e importamos la función que acabamos de extraer dentro del `useEffect()` en donde al resolver la promesa guardamos los resultados dentro del arreglo de gifs, además de añadirle como dependencia al `useEffect()` el argumento de categoría, para que se actualice el efecto de la petición cada que se ingrese una nueva búsqueda:

```jsx
export const GifGrid = ({ category }) => {

    const [gifs, setGifs] = useState([]);

    useEffect(() => {
        getGifs(category)
        .then(setGifs)
    }, [category]);

    return (...)
}
```

## CustomHook

Vamos a crear un hook personalizado que nos permita tener una variable de loading y un arreglo con la data. Dicho hook va a estar en la carpeta `hooks/useFetchGifs.js`:

```js
import { useState } from "react";

export const useFetchGifs = () => {
    const [state, setState] = useState({
        data: [],
        loading: true
    });

    return state
};
```

Dentro del componente `<GifsGrid />` vamos a cambiar lo que teniamos por la siguiente estructura:

```jsx
import React from 'react'
import PropTypes from 'prop-types'
import { useFetchGifs } from '../hooks';

export const GifGrid = ({ category }) => {

    const { loading } = useFetchGifs()

    return (
        <>
            <h3>{category}</h3>
            { loading ? 'Cargando...' : 'Data cargada' }
        </>
    )
}

GifGrid.propTypes = {
    category: PropTypes.string
}
```

## useFetchGifs - Obtener imágenes y bandera de carga

Dentro de nuestro custom hook podemos llamar el helper que creamos para poder extraer la data del endpoint, y cuando se resulve la promesa, entonces se cambia el estado del loading:

```js
import { getGifs } from "../helpers";

export const useFetchGifs = (category) => {
    const [state, setState] = useState({
        data: [],
        loading: true
    });

    useEffect(() => {
        getGifs(category)
            .then(gifs => setState({
                data: gifs,
                loading: false
            }))
    }, [category])

    return state
};
```

En el componente `<GifsGrid />` solo debemos añadir el parámetro al custom hook y usar la data y el loading que se obtienen para hacer un renderizado condicional:

```jsx
export const GifGrid = ({ category }) => {

    const { data: gifs, loading } = useFetchGifs(category)

    return (
        <>
            <h3>{category}</h3>
            {loading && <p>Cargando...</p>}
            <div className='card-grid'>
                {
                    gifs.map(gif => <GifGridItem key={gif.id} {...gif} />)
                }
            </div>

        </>
    )
}
```

## Animaciones CSS para nuestra aplicación

Vamos a usar animate.css para extraer las animaciones que queremos. Vamos a usar el CDN que nos ofrece la documentación y lo pegamos dentro de `public/index.html`:

```html
<head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
  />
</head>
```

Para usar cualquiera de las animaciones que nos ofrecen, hacemos lo siguiente:

```js
export const GifGridItem = ({ id, title, url }) => {
    return (
        <div className="card animate__animated animate__fadeIn">
            ...
        </div>
    );
};
```
