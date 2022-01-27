# Sección 15: Protección de Rutas

- Rutas públicas
- Rutas privadas
- Login y logout - Sin backend aún
- Recordar cuál fue la última ruta visitada para mejorar la experiencia de usuario.
- Context
- Reducer

Esta es una sección pequeña pero importante para trabajar las bases de la autenticación y protección de nuestra aplicación.

## Continuación del proyecto - Protección de Rutas

Vamos a usar el proyecto de la sección anterior, por lo que instalamos los node_modules con el comando `npm i` o `yarn add`. Luego levantamos el proyecto con el comando `npm start` o `yarn start`. Creamos 2 directorios: `auth` y `types`, los cuales vamos a emplear en las siguientes clases.

## Context y Reducer en mi aplicación

Necesitamos un estado global para poder saber si el usuario está autenticado. Lo primero que vamos a hacer es crear un archivo llamado `types/index.js` para poder definir los tipos de acciones dentro de nuestro reducer:

```js
export const types = {
    login: '[auth] Login',
    logout: '[auth] Logout'
}
```

Creamos el reducer para la autenticación dentro del archivo `auth/authReducer.js`:

```js
export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login: return { ...action.payload, logged: true }
        case types.logout: return { logged: false }
        default: return state;
    }
}
```

Luego creamos un componente de contexto para la autenticación:

```js
import { createContext } from 'react'

export const AuthContext = createContext()
```

## Proveer estado global de la aplicación

Lo primero que amos a hacer es proveer el contexto a nuestra aplicación atrapando el componente de rutas, ya que `<AuthContext />` es un componente de alto nivel. El valor que vamos a proveer será el estado del usuario y la función dispatch que se obtienen del hook `useReducer`, al cual se le pasa por parámetros el reducer de autenticación, un objeto vacío por estado inicial, y por estado diferido le pasamos un objeto con la información que se pueda llegar a obtener del localStorage (más adelante implementamos el localStorage):

```jsx
import React, { useReducer } from 'react';
import { AuthContext, authReducer } from './auth';
import { AppRouter } from './components/routers';

const init = () => {
    return {
        logged: true,
        name: 'Ferrer'
    }
}


const HeroesApp = () => {
    const [user, dispatch] = useReducer(authReducer, {}, init);
    return (
        <AuthContext.Provider value={{ user, dispatch }}>
            <AppRouter />
        </AuthContext.Provider>
    )
}

export default HeroesApp;
```

Dentro del componente `<Navbar />` tenemos el nombre del usuario que se encuentra logeado, ahora podemos obtener el nombre del usuario que se encuentra dentro del contexto al usar el hook `useContext`:

```jsx
export const Navbar = () => {
    const { user: { name } } = useContext(AuthContext)
    ...
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark px-5">
            <div className="container-fluid">
                ...
                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                    <ul className="navbar-nav ml-auto">
                        <span className="nav-item nav-link text-info mx-3">{name}</span>
                        ...
                    </ul>
                </div>
            </div>
        </nav >
    )
}
```

Ahora podemos implementar la obtención de la información del usuario desde el localStorage, para usarla como un estado inicial diferido dentro del `useReducer` que se proveerá como valor dentro del contexto:

```jsx
const init = () => JSON.parce(localStorage.getItem('user')) || { logged: false }

const HeroesApp = () => { ... }
```

## Login de un usuario

Dentro del componente `<LoginScreen />` vamos a enviar usar la función dispatch que se encuentra dentro del contexto de autenticación, para luego permitir que cada que se presione el botón de ingreso se establezca la acción que se debe disparar en el reducer, y luego si navegamos a la página de la zona privada.

```jsx
export const LoginScreen = () => {

    const navigate = useNavigate()

    const { dispatch } = useContext(AuthContext)

    const handleLogin = () => {
        const action = {
            type: types.login,
            payload: {
                name: 'David Ferrer'
            }
        }
        dispatch(action)

        navigate('/marvel', {
            replace: true
        })
    }
    ...
}
```

Ahora necesitamos guardar el usuario dentro del localStorage, por lo que dentro del hook `useEffect` dentro del componente `<HeroesApp />` almacenamos al usuario si existe:

```jsx
const HeroesApp = () => {
    ...
    useEffect(() => {
        if (!user) return
        localStorage.setItem('user', JSON.stringify(user))
    }, [user])
    ...
}
```

## Logout del usuario

Dentro del componente `<Navbar />` implementamos la funcionalidad para el botón de logout. Para ello necesitamos el dispatch del contexto y enviar una acción con el tipo logout:

```jsx
export const Navbar = () => {

    const { user: { name }, dispatch } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch({ type: types.logout })
        navigate('/login', {
            replace: true
        })
    }
    ...
}
```

Si revisamos el localStorage nos lograremos dar cuenta que se actualiza el item del usuario cada que entramos y salimos. Esto es debido a que mediante el `useEffect` estamos atentos a los cambios sobre la información del usuario, y recordemos que la información del usuario es inicialmente la parte del OR que establecimos dentro la función inicial diferida del hook `useReducer`, además de que el mismo reducer establece los valores del objeto user dependiendo del tipo de la acción disparada.

## Rutas privadas

Dentro del componente `<AppRouter />` vamos cambiar el elemento que se renderiza para la ruta `/*`. Queremos que todos los elementos que caen dentro de dicho path sean protegidos, por lo tanto creamos un Higher Order Component (HOC) llamado `<PrivateRoute />` que va a envolver el HOC `<Dashboard />`:

```jsx
export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                ...
                <Route path='/*' element={
                    <PrivateRoute>
                        <DashboardRoutes />
                    </PrivateRoute>
                } />
            </Routes>
        </BrowserRouter>
    )
}
```

El componente `<PrivateRoute />` recibe por props algo que llamaremos `children`, es decir los componentes hijos. Como este componente es un componente funcional, podemos acceder al contexto que estamos proveyendo. De allí mismo sacamos la propiedad de si está logeado o no el usuario para poder determinar mediante un ternario si retornamos los componente hijos o si retornamos otro componente, el cual para este caso, el componente `<Navigate />` de react-router-dom, com el path hacía el login:

```jsx
export const PrivateRoute = ({ children }) => {
    const { user: { logged } } = useContext(AuthContext)

    return logged ? children : <Navigate to="/login" />
}
```

## Rutas públicas

Ahora debemos hacer la misma lógica de lo anterior, pero para la ruta pública. Nosotros no podemos ingresar a la ruta de login si estamos autenticados, a no ser que presionemos el botón de logout. Para ello creamos el higher-order component `<PublicRoute />` que recibirá componentes hijos. Usamos el contexto y a partir de una de las propiedades del usuario hacemos un ternario para saber si retornamos los componentes hijos de la ruta pública, o si enviamos al usuario a la ruta raíz de la zona privada:

```jsx
export const PublicRoute = ({ children }) => {
    const { user: { logged } } = useContext(AuthContext)

    return logged ? <Navigate to="/" /> : children
}
```

Dentro del componente `<AppRouter />` implementamos el componente anterior de la siguiente manera:

```jsx
export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={
                    <PublicRoute>
                        <LoginScreen />
                    </PublicRoute>
                } />
                ...
            </Routes>
        </BrowserRouter>
    )
}
```

## Recordar la última página visitada

Todas las rutas de nuestra aplicación que son diferentes al login pasan por el componente `<PrivateRoute />`, lo cual lo convierte en un punto neuralgico para almacenar la última ruta de navegación. Vamos a usar el componente `useLocation` de react-router-dom para capturar la ruta actual mientras se navega en la zona privada, para luego guardarlo dentro del LocalStorage. Es importante aclarar que las rutas que contienen query params no están siendo tomadas, por ejemplo de la ruta `/search?q=batman` solo quedará almacenado en el localStorage el path `/search`, lo demás se encuentra dentro de la propiedad `search` del objeto que retorna el hook `useLocation`:

```jsx
export const PrivateRoute = ({ children }) => {
    ...
    const { pathname } = useLocation()
    localStorage.setItem('lastPath', pathname)
    ...
}
```

Cuando hacemos login, vamos a ir a la última ruta en la que estaba el usuario, para ello vamos a modificar el método para hacer login del componente `<LoginScreen />`:

```jsx
export const LoginScreen = () => {
    ...
    const handleLogin = () => {
        ...
        const lastPath = localStorage.getItem('lastPath') || '/'

        navigate(lastPath, {
            replace: true
        })
    }
    ...
}
```

Para poder incluir los query params dentro de la ruta guardada, necesitamos la propiedad `search` del objeto que retorna el hook `useLocation()`, propiedad que se convierte en un string vacío que no afecta en caso se concatenarlo con la propiedad `pathname`:

```jsx
export const PrivateRoute = ({ children }) => {
    ...
    const { pathname, search } = useLocation()
    localStorage.setItem('lastPath', pathname + search)
    ...
}
```
