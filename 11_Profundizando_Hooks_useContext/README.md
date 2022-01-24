# Sección 11: Profundizando Hooks - useContext

- Context
- Provider
- useContext
- React Router
- Links y NavLinks
- CreateContext
- SPA ( Single Page Application )

El objetivo de la sección es principalmente aprender sobre el Context, el Router es un valor agregado que explotaremos mucho más en próximas secciones, pero al usar un Router, podemos explicar claramente el problema y necesidad del context.

## Introducción al Context

Nos dimos cuenta que el componente `<TodoApp />` de la sección anterior, tenia un componente hijo llamado `<TodoList />`, el cual a su vez tiene otro componente `<TodoListItem />`. El último componente tenía que pedir la referencia de la función del componente 'padre', mientras que a su vez este hacía la petición de la referencia de la misma función al componente 'abuelo'.

Lo anterior el valido, pero que pasaría si ¿tuviéramos 2 componente que no están relacionados, pero 1 necesita el resultado del otro? La manera de solucionarlo, es teniendo un espacio que este por encima de los 2 componente y que pueda almacenar el estado de la información, de está manera uno modifica la información y el otro la puede acceder.

## Preparación de nuestra aplicación con rutas

Vamos a crear una aplicación con rutas en base al proyecto de la sección anterior. Necesitamos hacer una instalación para poder manejar el ruteo. Usamos el comando `npm i react-router-dom@5.2.0` para instalar la librería en la versión especifica. Luego levantamos el proyecto con el comando `npm start` o `yarn start`.

Dentro de los componente creamos un nuevo directorio para el tema del `useContext`, allí mismo establecemos 4 componentes: `<HomeScreen />`, `<LoginScreen />`, `<AboutScreen />` y `<MainApp />`. Dentro del archivo `index.js` cambiamos el elemento principal a renderizar:

```jsx
import { MainApp } from './components/09-useContext';


ReactDOM.render(
    <React.StrictMode>
        <MainApp />
    </React.StrictMode>,
    document.getElementById('root')
);
```

## Configurar Router en React

Vamos a crear un componente llamado `<AppRouter />` en donde establecemos las rutas y los componentes a donde deben apuntar:

```jsx
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AboutScreen, HomeScreen, LoginScreen } from '.';


export const AppRouter = () => {
    return (
        <Router>
            <>
                <Switch>
                    <Route exact path="/" component={HomeScreen} />
                    <Route exact path="/login" component={LoginScreen} />
                    <Route exact path="/about" component={AboutScreen} />
                </Switch>
            </>
        </Router>
    );
};
```

Luego, dentro de `<MainApp />` llamamos la configuración de las rutas:

```jsx
import React from 'react';
import { AppRouter } from '.';


export const MainApp = () => {
    return (
        <div className="container mt-3">
            <h1>MainApp</h1>
            <hr />
            <AppRouter />
        </div>
    )
}
```

## Link y NavLink

Ambas etiquetan son provistas por react-router-dom, pero la diferencia entre la primera y la segunda, es que `NavLink` nos permite tener clases teniendo en cuenta si la ruta está activa, por ello es muy común tenerla en menús de navegación.

```jsx
import React from 'react';
import { NavLink } from 'react-router-dom'


export const NavBar = () => {
    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className="container-fluid">
                <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                    <li className='nav-item'><NavLink exact to="/" className="nav-link" activeClassName='active'>Home</NavLink></li>
                    <li className='nav-item'><NavLink exact to="/about" className="nav-link" activeClassName='active'>About</NavLink></li>
                    <li className='nav-item'><NavLink exact to="/login" className="nav-link" activeClassName='active'>Login</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}
```

## createContext y useContext

Crear un contexto es sencillo. Tenemos un archivo llamado `UserContext.jsx`, en el que importamos `createContext` desde react, y luego exportamos una contante que contenga el valor al crear el contexto. Dicho contexto puede tener un valor por defecto, por el momento sera un null:

```jsx
import { createContext } from 'react'

export const UserContext = createContext(null)
```

Luego, dentro del componente `<MainApp />` atrapamos las rutas dentro del contexto, con el fin de poder pasarle todo el contenido del contexto al resto de la aplicación:

```jsx
import React from 'react';
import { AppRouter } from '.';
import { UserContext } from './UserContext';


export const MainApp = () => {
    return (
        <UserContext.Provider>
            <AppRouter />
        </UserContext.Provider>
    )
}
```

Un contexto es considerado como un componente de orden superior o en inglés Higher-order componente (HOC), lo cual nos permite el reuso de la lógica de componentes. Una vez tenemos el contexto proveyendo algo a toda la aplicación, necesitamos definir que es ese algo:

```jsx
export const MainApp = () => {
    const user = {
        id: 1234,
        name: 'Ferrer',
        email: 'ferrer@mail.com'
    }

    return (
        <UserContext.Provider value={user}>
            <AppRouter />
        </UserContext.Provider>
    )
}
```

Dentro de cualquier componente hijo podemos acceder al valor del contexto usando una sola línea:

```jsx
import React, { useContext } from 'react';
import { UserContext } from './UserContext';

export const HomeScreen = () => {

    const userContext = useContext(UserContext)
    
    return (
        <>
            <h2>Home Screen</h2>
            <hr />
        </>
    )
}
```

## useContext

Vamos a usar el hook `useState` para proveer un estado y su función para mutarlo:

```jsx
export const MainApp = () => {

    const [user, setUser] = useState({ })

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <AppRouter />
        </UserContext.Provider>
    )
}
```

Luego dentro del componente `<HomeScreen />`, podemos desestructurar las propiedad del valor del contexto provisto y mostrarlas dentro del mismo:

```jsx
export const HomeScreen = () => {
    const { user } = useContext(UserContext)
    
    return(
        <>
            ...
            <pre className="container">{ JSON.stringify(user, null, 5) }</pre>
        </>
    )
}
```

Dentro del componente `<LoginScreen />` vamos a llamar la función para modificar el estado dentro del contexto, y creamos un método que simule el ingreso de un usuario:

```jsx
export const LoginScreen = () => {

    const { setUser } = useContext(UserContext)

    const handleLogin = () => {
        setUser({ 
            id: 1234, 
            name: 'ferrer',
            email: 'test@mail.com'
        })
    };


    return (
        <>
            <h2>Login Screen</h2>
            <hr />
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
        </>
    )
}
```

Una vez se presione el botón de Login, podemos observar dentro del contenido del la página `<HomeScreen />`, que el valor del usuario ya no es un objeto vacío. Podemos hacer lo contrario si ponemos un botón de logout dentro de `<AboutScreen />`:

```jsx
export const AboutScreen = () => {

    const {setUser} = useContext(UserContext)

    return (
        <>
            <h2>About Screen</h2>
            <hr />
            <button className="btn btn-danger" onClick={() => setUser({})}>Logout</button>
        </>
    )
}
```
