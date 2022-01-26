# Sección 14: HéroesApp - Single Page Application (SPA)

- SPA ( Single Page Application ) a profundidad
- Diferentes temas en la misma aplicación aplicados a diferentes rutas
- Múltiples Routers
- Push y Replace en el History
- Leer argumentos por URL
- QueryParams
- Aplicar filtros utilizando QueryString

En esta sección aún no haremos protección de rutas, pero dejaremos el estilo de esos componentes listos para la siguiente sección. Aquí quiero enfocarme en la funcionalidad de la aplicación suponiendo que estamos autenticados.

## Inicio del proyecto - HéroesApp

Vamos a crear un nuevo proyecto con el comando `npx create-react-app heroes-app`. También vamos a usar el CDN de Bootstrap dentro del archivo `public/index.html`:

```html
<head>
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
</head>
```

El proyecto lo levantamos con el comando `npm start` o `yarn start`. Dentro de la carpeta `public` creamos un directorio llamado `assets` dentro de la cual copiamos las imágenes estáticas que tenemos de los héroes.

## Creando un primer Router

Vamos a instalar React-Router-Dom v6 con el comando `npm install react-router-dom@6`, luego creamos un componente `<Navbar />` con la siguiente información:

```jsx
import React from 'react'
import { Link, NavLink } from 'react-router-dom'


export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">

            <Link to="/" className="navbar-brand">
                Asociaciones
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">
                    <NavLink exact to="/marvel" activeClassName="active" className="nav-item nav-link">
                        Marvel
                    </NavLink>

                    <NavLink exact to="/dc" activeClassName="active" className="nav-item nav-link">
                        DC
                    </NavLink>
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul className="navbar-nav ml-auto">
                    <NavLink exact to="/login" activeClassName="active" className="nav-item nav-link">
                        Logout
                    </NavLink>
                </ul>
            </div>
        </nav>
    )
}
```

Lo anterior funcionaba con react-router-dom v5, pero en la siguiente clase hacemos el cambio para la nueva versión. Lo que si vamos a hacer en esta, es crear un componente que maneje las rutas:

```jsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';


export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<MarvelScreen />}></Route>
                <Route path='/marvel' element={<MarvelScreen />}></Route>
                <Route path='/dc' element={<DCScreen />}></Route>
                <Route path='/search' element={<SearchScreen />}></Route>
                <Route path='/login' element={<LoginScreen />}></Route>
            </Routes>
        </BrowserRouter>
    )
}
```

Este componente lo llamamos dentro de nuestro componente principal `<HeroesApp />`:

```jsx
const HeroesApp = () => {
    return (
        <>
            <AppRouter />
        </>
    )
}
```

## Colocar clase de la ruta activa

Dentro del componente `<Navbar />` vamos a modificar los NavLink para poder tener una clase cuando la ruta este activa, además de que los exact ya no son necesarios para ello necesitamos hacer lo siguiente:

```jsx
export const Navbar = () => {
    return (
        ...
        <NavLink to="/marvel"
                className={({ isActive }) => 'nav-item nav-link' + (isActive && ' active')}>
            Marvel
        </NavLink>
        ...
    )
}
```

## Crear un segundo Router

Vamos a crear un nuevo router donde almacenaremos las rutas y componentes que se deben ver de manera privada:

```jsx
export const DashboardRoutes = () => {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path='marvel' element={<MarvelScreen />}></Route>
                <Route path='dc' element={<DCScreen />}></Route>
                <Route path='search' element={<SearchScreen />}></Route>
                <Route path='/' element={<MarvelScreen />}></Route>
            </Routes>
        </>
    )
}
```

Ahora, en el componente `<AppRouter />` simulamos un sistema de navegación para rutas privadas y públicas, aunque aún no se hace autenticación, ni protección de rutas:

```jsx
export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<LoginScreen />}></Route>
                <Route path='/*' element={<DashboardRoutes />} />
            </Routes>
        </BrowserRouter>
    )
}
```

## Navigate push / replace - useNavigate

Dentro del componente `<LoginScreen />` vamos a crear un botón que nos permita ingresar a la ruta de Marvel, pero que en vez de añadir al stack de navegación la ruta del login, sea reemplazada por una nueva ruta. Es importante que en este caso usemos el hook `useNavigate` de `react-router-dom`. Lo anterior lo hacemos puesto que aún no tenemos un sistema de autenticación real:

```jsx
import { useNavigate } from 'react-router-dom'

export const LoginScreen = () => {

    const navigate = useNavigate()
    
    const handleLogin = () => {
        navigate('/marvel', {
            replace: true
        })
    };
    

    return (
        <div className='container mt-5'>
            <h1>Login Screen</h1>
            <hr />

            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
        </div>
    )
}
```

Vamos a hacer lo mismo en el componente de `<Navbar />` con el botón de logout:

```jsx
export const Navbar = () => {

    const navigate = useNavigate()

    const handleLogout = () => {
        navigate('/login', {
            replace: true
        })
    }


    return (
        ...
        <button className="btn btn-outline-light" onClick={handleLogout}>
            Logout
        </button>
        ...
    )
}
```

## Lista de Héroes

Vamos a crear un nuevo archivo llamado `src/data/heroes.js`, en donde copiamos un arreglo con objetos que contienen la información de diversos héroes. Luego creamos una función para poder retornar los héroes según la casa publicadora, en caso de que el parámetro ingresado sea valido. Dicho método se encuentra en el archivo `src/selectors/getHeroByPublisher.js`:

```js
import { heroes } from '../data/heroes'

export const getHeroByPusblisher = (publisher) => {
    const validPublishers = ['DC Comics', 'Marvel Comics']

    if (!validPublishers.includes(publisher)) {
        throw new Error(`${publisher} is nota a valid publisher`)
    }
    
    return heroes.filter(hero => hero.publisher === publisher)
}
```

Este método lo vamos a usar dentro del componente `<HeroList />` que recibe por props la casa publicadora:

```jsx
import React from 'react';
import { getHeroByPusblisher } from '../../selectors';
import PropTypes from 'prop-types'


export const HeroList = ({ publisher }) => {

    const heroes = getHeroByPusblisher(publisher)

    return (
        <>
            <ul>
                {
                    heroes.map(hero => (<li key={ hero.id }>{ hero.superhero }</li>))
                }
            </ul>
        </>
    )
}


HeroList.propTypes = {
    publisher: PropTypes.string.isRequired
}
```

Dentro de los componentes `<DCScreen />` y `<MarvelScreen />` usamos el componente que acabamos de crear:

```jsx
export const DCScreen = () => {
    return (
        <>
            <h1>DC Screen</h1>
            <HeroList publisher={'DC Comics'} />
        </>
    )
}
```

```jsx
export const MarvelScreen = () => {
    return (
        <>
            <h1>Marvel Screen</h1>
            <HeroList publisher={'Marvel Comics'} />
        </>
    )
}
```

## Tarjeta con la información del héroe

Vamos a crear un componente llamado `<HeroCard />`, en el cual vamos a crear la tarjeta que necesitamos por cada héroe:

```jsx
import React from 'react'
import { Link } from 'react-router-dom'


export const HeroCard = ({
    id, superhero, publisher, alter_ego, first_appearance, characters
}) => {
    return (
        <div className='col'>
            <div className="card">
                <div className="row nog-gutters">
                    <div className="col-md-5">
                        <img src={`/assets/${id}.jpg`} className="card-img-top" alt={superhero} />
                    </div>
                    <div className="col-md-7">
                        <div className="card-body">
                            <h5 className="card-title">{ superhero }</h5>
                            <p className="card-text">{ alter_ego }</p>
                            {
                                alter_ego !== characters && <p className="text-mutted">{ characters }</p>
                            }
                            <p className="card-text">
                                <small className="text-muted">{ first_appearance }</small>
                            </p>
                            <Link to={`/hero/${id}`}>More...</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
```

Luego, dentro del componente `<HeroList />` llamamos las cartas por cada héroe:

```jsx
export const HeroList = ({ publisher }) => {
    ...
    return (
        <div className='row row-cols-1 row-cols-md-3 g-3'>
            { heroes.map(hero => <HeroCard key={hero.id} {...hero} />) }
        </div>
    )
}
```

## Leer argumentos por URL

Necesitamos definir la ruta para poder recibir el id por héroe desde la URL:

```jsx
export const DashboardRoutes = () => {
    return (
        <>
            ...
            <div className="container mt-3">
                <Routes>
                    ...
                    <Route path='hero/:id-hero' element={<HeroScreen />} />
                </Routes>
            </div>
        </>
    )
}
```

Luego creamos el selector para obtener los usuarios por el id que se le ingresa (`src/selectors/getHeroByID.js`):

```js
import { heroes } from "../data/heroes";


export const getHeroByID = (id) => heroes.find(hero => hero.id === id)
```

Dentro del componente `<HeroScreen />` vamos a usar el hook `useParams()` para obtener el id que se ingresa por la URL y luego usar nuestro función. En caso de que no haya ningún héroe con el id que se ingresa, entonces enviamos al usuario a la ruta inicial de la aplicación:

```jsx
import React from 'react';
import { useParams, Navigate } from 'react-router-dom'
import { getHeroByID } from '../../selectors';


export const HeroScreen = () => {

    const { idHero } = useParams()

    const hero = getHeroByID(idHero)

    if(!hero) return <Navigate to='/' />

    return (
        <>
            <pre>{JSON.stringify(hero, null, 5)}</pre>
        </>
    )
}
```

## Estilo del componente HeroScreen

Necesitamos desestructurar las propiedades del héroe para poderlos usar dentro de la interfaz gráfica. Luego tenemos un botón para regresar a la ruta anterior, en tal caso usamos el hook `useNavigate` para poder regresar 1 página atras (-1):

```jsx
import React from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { getHeroByID } from '../../selectors';


export const HeroScreen = () => {

    const { idHero } = useParams()

    const navigate = useNavigate()

    const hero = getHeroByID(idHero)
    if (!hero) return <Navigate to='/' />

    const { id, alter_ego, characters, first_appearance, publisher, superhero } = hero

    const handleReturn = () => {
        navigate(-1)
    };    

    return (
        <div className="row mt-5">
            <div className="col-4">
                <img src={`/assets/${id}.jpg`} alt={superhero} className="img-thumbnail" />
            </div>
            <div className="col-8">
                <h3>{ superhero }</h3>
                <ul className="list-group my-3">
                    <li className="list-group-item"><b>Alter ego:</b> {alter_ego}</li>
                    <li className="list-group-item"><b>Publisher:</b> {publisher}</li>
                    <li className="list-group-item"><b>First Appearance:</b> {first_appearance}</li>
                </ul>
                <h5 className='my-3'>Characters</h5>
                <p>{characters}</p>

                <button className="btn btn-outline-info" onClick={handleReturn}>
                    Regresar
                </button>
            </div>
        </div>
    )
}
```

## useMemo

Dentro de los componentes debemos tener cuidado cuando hacemos peticiones a las bases de datos o APIs a través endpoints o selectores, ya que pueden ser procesos pesados y no debemos llamarlos en cada cambio del estado de un componente. Si la petición no cambia, lo ideal sería almacenar el resultado de la respuesta en cada renderización para ello evitar recargas a la solicitud en cada pequeño cambio indirecto dentro del state.

En nuestro caso necesitamos que dentro del componente `<HeroScreen />` se almacene el resultado de la solicitud que se hace para obtener la información del héroe por su ID, y solo se hace el cambio de los resultado cada que la dependencia del Id cambie.

```jsx
export const HeroScreen = () => {
    ...
    const hero = useMemo(() => getHeroByID(idHero), [idHero]);
    ...
}
```

También necesitamos hacer lo mismo para el componente `<HeroList />`, con el fin de poner almacenar la información de los héroes por casa publicadora. Por el momento son procesos pequeños, pero cuando se hacen peticiones más grandes, debemos reducir el consumo de datos al evitar estar reenviando una solicitud que puede llegar a considerarse innecesaria:

```jsx
export const HeroList = ({ publisher }) => {
    const heroes = useMemo(() => getHeroByPusblisher(publisher), [publisher])
    ...
}
```

## Animaciones en nuestro componente

Vamos a usar [Animate.css](https://animate.style/) para darle algunos estilos animados a nuestro componentes. Vamos a usar el CDN que nos ofrece su documentación, dentro de `public/index.html`:

```html
<head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
</head>
```

## SearchComponent

Vamos a usar el custom hook de secciones pasadas llamado `useForm`, por lo que creamos su archivo y lo copiamos:

```js
import { useState } from "react";

/**
 * @param [initialState] - The initial state of the form.
 * @returns The values object, the handleInputChange function, and the reset function.
 */
export const useForm = (initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const reset = () => setValues(initialState)

    const handleInputChange = ({ target }) => {
        setValues({
            ...values,
            [target.name]: target.value
        })
    }

    return [values, handleInputChange, reset]
}
```

Luego dentro del componente `<SeachScreen />` lo implementamos:

```jsx
export const SearchScreen = () => {

    const [formValues, handleInputChange, reset] = useForm({ searchText: '' })

    const { searchText } = formValues

    const handleSubmit = (e) => {
        e.preventDefault()
        reset()
    }

    return (
        <>
            ...
            <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-5">
                    ...
                    <form onSubmit={handleSubmit}>
                        <input name="searchText" value={searchText} onChange={handleInputChange} ... />
                        ...
                    </form>
                </div>
            </div>
        </>
    )
}
```

## Mostrar listado de héroes

Creamos un nuevo selector en el que buscamos por nombre y retonamos una lista de héroes que coincidan con la búsqueda:

```js
import { heroes } from "../data/heroes"

export const getHeroByName = (name = '') => {
    name = name.toLowerCase()
    return heroes.filter(hero => hero.superhero.toLowerCase().includes(name))
}
```

Luego dentro del componente `<SearchScreen />` usamos el selector:

```jsx
export const SearchScreen = () => {
    const [heroes, setHeroes] = useState([]);
    ...
    const handleSubmit = (e) => {
        e.preventDefault()
        setHeroes(getHeroByName(searchText))
        reset()
    }

    return (
        <>
            ...
            <div className="row">
                ...
                <div className="col-sm-12 col-md-6 col-lg-7">
                    <h4>Results:</h4>
                    <hr />
                    {
                        (heroes.length > 0)
                            ? heroes.map(hero => <HeroCard key={hero.id} {...hero} />)
                            : <h5>No hay coincidencias</h5>
                    }
                </div>
            </div>
        </>
    )
}
```

## Aplicar filto de héroes - QueryString

Lo que vamos a hacer es agregar la búsqueda a los query params de la url, por lo que necesitamos el hook `useNavigate` de `react-router-dom`:

```jsx
import { useNavigate } from 'react-router-dom';

export const SearchScreen = () => {
    const navigate = useNavigate()
    ...
    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(`?q=${searchText}`)
        reset()
    }
    ...
}
```

Para acceder a los query params de una manera más sencilla, vamos a instalar la librería `query-string` con el comando `npm i query-string`. Ahora podemos acceder a la locación actual con el hook `useLocation` de react-router-dom, y por medio de la librería query string, desestructurar los query params que se encuentra en la propiedad search de la ruta actual. Dicho query será inicialmente un string vacio y será el valor inical del searchText:

```jsx
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string'


export const SearchScreen = () => {
    ...
    const location = useLocation()

    const { q = '' } = queryString.parse(location.search)

    const [formValues, handleInputChange, reset] = useForm({
        searchText: q
    })
    ...
```

Dentro de nuestro selector vamos a evaluar si el nombre es un string vacio, por que en tal caso debemos retornar un arreglo vacio:

```jsx
export const getHeroByName = (name = '') => {
    if (name === '') return []
    ...
}
```

Volvemos a nuestro componente y ya podemos memorizar la petición al selector y cambiando el valor guardado mientras no cambie el valor de la query, y a apartir del arreglo resultante mostrar el componente `<HeroCard />` con la información de los heróes:

```jsx
export const SearchScreen = () => {
    ...
    const heroesFilter = useMemo(() => getHeroByName(q), [ q ])
    ...
    return (
        <>
            ...
            <div className="row">
                ...
                <div className="col-sm-12 col-md-6 col-lg-7">
                    ...
                    {
                        (heroesFilter.length > 0)
                            ? heroesFilter.map(hero => <HeroCard key={hero.id} {...hero} />)
                            : <div className="alert alert-info">No hay coincidencias</div>
                    }
                </div>
            </div>
        </>
    )
}
```

## Mostrar mensajes condicionales

Vamos a cambiar el mensaje condicional que tenemos por uno más especial:

```jsx
export const SearchScreen = () => {
    ...
    return (
        <>
            ...
            <div className="row">
                ...
                <div className="col-sm-12 col-md-6 col-lg-7">
                    <h4>Results:</h4>
                    <hr />
                    {
                        (q === '')
                            ? <div className="alert alert-info">Search a Hero</div>
                            : (heroesFilter.length === 0) && <div className="alert alert-info">No Matches by { q }</div>
                    }
                    {
                        heroesFilter.map(hero => <HeroCard key={hero.id} {...hero} />)
                    }
                </div>
            </div>
        </>
    )
}
```
