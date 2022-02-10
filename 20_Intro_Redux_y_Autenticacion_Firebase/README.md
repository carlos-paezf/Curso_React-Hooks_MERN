# Sección 20: Introducción a Redux y Autenticación en Firebase

- Redux aplicado en nuestro proyecto
- Firebase
- FireStore
- Redux Devtools
- Thunk
- Formularios
- Google SignIn
- Acciones Asíncronas
- Mantener el estado de la autenticación

En esta sección configuraremos Redux en nuestro proyecto por primera vez, aplicado al inicio en la parte de la autenticación y mantener el estado de la misma a lo largo de toda la aplicación.

## Configuración Redux en nuestra aplicación

Vamos a usar el proyecto de la sección 18, por lo que para instalar los paquetes de dicho proyecto usamos el comando `yarn install`, puesto que estamos usando el gestor de paquetes yarn. Luego levantamos el proyecto con el comando `yarn start`.

Para instalar la librería de react-redux y redux usamos el comando `yarn add react-redux redux`. Vamos a crear un directorio llamado `reducers`, y dentro del mismo creamos un archivo llamado `authReducer.js` que contendrá una función pura. También creamos un archivo para el tipo de acciones de nuestro proyecto (`types/types.js`), y creamos un objeto con las primeras 2 acciones para la autenticación:

```js
export const types = {
    login: '[Auth] login',
    logout: '[Auth] logout'
}
```

Dentro del reducer para el auth, establecemos los procedimientos dependiendo el tipo de la acción:

```js
import { types } from "../types/types";

export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login: return {
            uid: action.payload.uid,
            name: action.payload.displayName
        }
        case types.logout: return {}

        default: return state
    }
}
```

Ahora creamos el Store dentro del archivo `store/store.js`. Necesitamos exportar el store, el cual se crea mediante la función `createStore` de la librería `redux`. El store solo admite un reducer, por lo que para poder usar varios necesitamos de la función `combineReducers()` de la misma librería:

```js
import { createStore, combineReducers } from 'redux'
import { authReducer } from '../reducers'

const reducers = combineReducers({
    auth: authReducer,
})

export const store = createStore(reducers)
```

Para poder entregarle la fuente única de verdad a toda la aplicación, usamos el higher-order-component `<Provider />` de `react-redux`, dentro de `<JournalApp />`:

```jsx
import { Provider } from 'react-redux';
import { store } from './store/store';

const JournalApp = () => {
    return (
        <Provider store={ store }>
            <AppRouter />
        </Provider>
    )
}
```

## Redux DevTools

Para poder usar la extensión `Redux Devtools` tenemos que hacer la siguiente configuración dentro de `store.js`:

```jsx
...
export const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
```

Cuando regresamos a la extensión, podremos observar que se ha seleccionado una nueva instancia de nuestra aplicación, para ser exacto toma la instancia de `JournalApp` donde estamos proveyendo el store.

## Primer dispatch de una acción a nuestro Store

Vamos a crear un customHook llamado [`useForm`](../11_Profundizando_Hooks_useContext/hooks-app/src/hooks/useForm.js 'CustomHook useForm') que creamos en sección anteriores. Luego, dentro de `<LoginScreen />` debemos implementar nuestro hook.

```jsx
export const LoginScreen = () => {

    const [formValues, handleInputChange, reset] = useForm({
        email: '',
        password: ''
    })

    const { email, password } = formValues

    return (
        <>
            ...
            <form>
                <input type="text" className="auth__input" name='email' value={email} onChange={handleInputChange} placeholder="Email" autoComplete='off' />
                <input type="password" className="auth__input" name='password' value={password} onChange={handleInputChange} placeholder="Password" autoComplete='off' />
                ...
            </form>
        </>
    )
}
```

Luego necesitamos implementar una función para poder efectuar una acción cada que se envíe el formulario:

```jsx
export const LoginScreen = () => {
    ...
    const handleLogin = (e) => {
        e.preventDefault()
    }

    return (
        <>
            ...
            <form onSubmit={handleLogin}>...</form>
        </>
    )
}
```

El método para el envío el formulario debe disparar una acción. Vamos a agrupar todas las acciones dentro de archivos en específicos, en este caso será el archivo `actions/auth.js`. La primera acción, será la de hacer login, para la cual necesitamos el uid y el displayName del usuario:

```js
export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
})
```

Ahora si podemos disparar la acción desde el método del envío del formulario, y para ello usamos el hook `useDispatch()` de react-redux:

```jsx
export const LoginScreen = () => {
    const dispatch = useDispatch()
    ...
    const handleLogin = (e) => {
        e.preventDefault()
        dispatch(login(123, 'temporal'))
    }
    ...
}
```

Cuando volvemos al navegador y presionamos el botón de login, podemos observar que en el árbol del state tenemos el payload que le enviamos dentro del action.

## Configuración inicial de Firebase

Vamos a usar Firebase para la autenticación de nuestra aplicación. Dentro de la consola de Firebase creamos un nuevo proyecto con el nombre que queramos. Para habilitar la autenticación con Google, dentro de la consola de nuestro proyecto en Firebase, vamos a la pestaña de *Authentication*, y luego elegimos el método para hacer login, en nuestro caso necesitamos habilitar como *proveedor de acceso* a Google y el *proveedor nativo* de correo y contraseña.

Luego vamos a instalar el manejador de Firebase dentro de nuestra aplicación, y esto lo hacemos con el comando `yarn add firebase@8.10.0`. Con esto instalamos la versión 8.10.0, la cual maneja namespaced, a diferencia de la versión 9, la cual es modular permitiendo hacer un tree shaken e importar las librerías necesarias. No se instalar esta última versión, con el fin de poder seguir al pie de la letra el curso.

## Thunk Middleware - Acciones Asíncronas

Necesitamos implementar un middleware dentro del dispatcher, que nos permita realizar peticiones asíncronas como el ingreso con google o hacer peticiones a la API. Vamos a usar la librería Redux Thunk, la cual instalamos con el comando `yarn add redux-thunk`. Dentro del archivo `store.js` hacemos la importación de la librería y la configuración de la misma, aquí debemos tener en cuenta que la creación del Store se modifica sustancialmente:

```js
import { ..., applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

...
const composeEnhancers = (typeof window !== 'undefined' && (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose))

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)
```

Vamos a crear la primera acción asíncrona, la cual va a retornar un callback que llama a la función encargada de hacer enviar por el payload la información del usuario logueado cuando se resuelva la petición asíncrona.

```js
export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        setTimeout(() => { 
            dispatch(login(123, 'Ferrer')) 
        }, 3500)
    }
}
```

El anterior método, lo llamamos dentro de `<LoginScreen />`, al momento de ingresar con el formulario:

```jsx
export const LoginScreen = () => {
    ...
    const handleLogin = (e) => {
        ...
        dispatch(startLoginEmailPassword(email, password))
    }   
}
```

## Configurar Firebase y Google Sign-In

Dentro de la consola de Firebase, necesitamos agregar Firebase a nuestro proyecto web, por lo que buscamos el icono `</>` dentro de la sección ***Descripción general del proyecto*** para poder registrar nuestra app. Luego vamos a crear un directorio dentro de nuestro proyecto que vamos a llamar `firebase`, y dentro del mismo creamos un archivo llamado `firebase-config.js`. En dicho archivo podemos poner el script que se nos muestra en la consola de firestore al registrar la app.

```js
import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyDUQgWLFR3R9cY_ssYtz2xettq21hBaOjI",
    authDomain: "journal-app-react-31a82.firebaseapp.com",
    projectId: "journal-app-react-31a82",
    storageBucket: "journal-app-react-31a82.appspot.com",
    messagingSenderId: "503923159005",
    appId: "1:503923159005:web:9da83f2ad716f2e1a09034"
}


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()


export { db, googleAuthProvider, firebase }
```

Ahora vamos a crear una acción que nos permita hacer el ingreso con el correo de google, por lo que creamos la siguiente función dentro de `auth.js`:

```js
export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
        .then(console.log)
    }
}
```

Luego dentro del componente `<LoginScreen />` creamos una función que se active cuando se presione sobre el botón para el ingreso con google:

```jsx
export const LoginScreen = () => {
    ...
    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin)
    }

    return (
        <>
            ...
            <form onSubmit={handleLogin}>
                ...
                <div className="auth__social-networks">
                    ...
                    <div className="google-btn" onClick={handleGoogleLogin}>...</div>
                </div>
                ...
            </form>
        </>
    )
}
```

Cuando ingresamos con una cuenta de google mediante el popup que aparece en nuestra aplicación, podemos obtener una información amplia del usuario, de la cual vamos tomar el corre, el display name y el uid. Esta última información la enviamos a la acción de login:

```js
export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user: { displayName, uid } }) => dispatch(login(uid, displayName)))
    }
}
```

Si pasamos a Redux DevTools, podemos observar que el árbol de estado ha cambiado con la información de los dispatch de las acciones asíncronas.

## Formulario de registro de usuarios

Lo primero que vamos a usar, es usar el customHook `useForm` dentro del componente `<RegisterScreen />`, con el fin de poder manipular los inputs de dicha página. Por el momento, mientras estamos en desarrollo vamos a tener información de relleno, pero luego se deben crear los campos vacíos:

```jsx
export const RegisterScreen = () => {

    const [formValues, handleInputChange] = useForm({
        name: 'Ferrer',
        email: 'ferrer@mail.com',
        password: '12345678',
        confirm_password: '12345678'
    })

    const { name, email, password, confirm_password } = formValues

    return (
        <>
            <h3 className="auth__title">Register</h3>
            <form>
                <input type="text" name='name' value={name} onChange={handleInputChange} ... />
                <input type="text" name='email' value={email} onChange={handleInputChange} ... />
                <input type="password" name='password' value={password} onChange={handleInputChange} ... />
                <input type="password" name='confirm_password' value={confirm_password} onChange={handleInputChange} .... />
                ...
            </form>
        </>
    )
}
```

Luego creamos el esqueleto de una función para hacer el registro a partir de los datos ingresados en el formulario:

```jsx
export const RegisterScreen = () => {
    ...
    const handleRegister = (e) => {
        e.preventDefault()
    }

    return (
        <>
            ...
            <form onSubmit={handleRegister}>...</form>
        </>
    )
}
```

## Manejo de errores del formulario

Vamos a crear una función que nos permita validar los campos del formulario, pero a su vez vamos a usar la librería validator.js, por lo que la instalamos con el comando `yarn add validator`:

```jsx
export const RegisterScreen = () => {
    ...
    const handleRegister = (e) => {
        e.preventDefault()
        isFormValid() && console.log('Formulario correcto')
    }

    const isFormValid = () => {
        if (name.trim().length === 0) {
            console.log('Name is required')
            return false
        }
        else if (!validator.isEmail(email)) {
            console.log('Email is required')
            return false
        }
        else if (password !== confirm_password || password.length < 5) {
            console.log('Password should be at least 6 characters and match each other')
            return false
        }
        return true
    }
    ...
}
```

## uiReducer y Acciones

Vamos a crear un nuevo reducer llamado `uiReducer.js`, pero primero vamos a definir los types para dicho reducer dentro del archivo `types.js`:

```js
export const types = {
    ...,
    uiSetError: '[UI] set error',
    uiRemoveError: '[UI] remove error'
}
```

En nuestro `uiReducer` tenemos un estado inicial con un estado de carga y un mensaje de error. Posteriormente, dependiendo del tipo de la acción efectuamos un procedimiento especifico. En el caso de querer tener poner un error, retornamos todo el objeto inicial, pero modificando el mensaje de error con el payload de la action. En caso de que se quiera remover el error, simplemente retornamos un null en el mensaje:

```js
const initialState = {
    loading: false,
    msgError: null
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.uiSetError: return {
            ...state,
            msgError: action.payload
        }
        case types.uiRemoveError: return {
            ...state,
            msgError: null
        }
        default: return state
    }
}
```

Para poder implementar este reducer, debemos ir al store y combinar el reducer:

```js
const reducers = combineReducers({
    ...,
    ui: uiReducer
})
```

Vamos a crear las acciones de crear y quitar un error para el UI dentro del archivo `actions/ui.js`:

```js
export const setError = (error) => ({
    type: types.uiSetError,
    payload: error
})


export const removeError = () => ({ type: types.uiRemoveError })
```

Dentro del componente `<RegisterScreen />` vamos a llamar el hook `useDispatch` para modificar el elemento del store en cada uno de los errores generados por los inputs, y en caso de que todo este perfecto, se remueve el error.

```jsx
export const RegisterScreen = () => {
    const dispatch = useDispatch()
    ...
    const handleRegister = (e) => {
        e.preventDefault()
        isFormValid() && dispatch(removeError())
    }
    
    const isFormValid = () => {
        if (name.trim().length === 0) {
            dispatch(setError('Name is required'))
            return false
        }
        else if (!validator.isEmail(email)) {
            dispatch(setError('Email is required'))
            return false
        }
        else if (password !== confirm_password || password.length < 5) {
            dispatch(setError('Password should be at least 6 characters and match each other'))
            return false
        }
        return true
    }
    ...
}
```

## useSelector - Obtener información del state

Vamos a usar el hook `useSelector` de react-redux, para poder obtener la información del objeto UI que se encuentra dentro del store. Aplicamos desestructuración para obtener la propiedad del error con el fin de poder evaluar si existe, y en tal caso mostrarlo en pantalla.

```jsx
export const RegisterScreen = () => {
    ...
    const { msgError } = useSelector(state => state.ui)
    ...
    return (
        <>
            <h3 className="auth__title">Register</h3>
            <form onSubmit={handleRegister}>
                {
                    msgError && <div className="auth__alert-error">{msgError}</div>
                }
                ...
            </form>
        </>
    )
}
```

## Crear usuario con correo y contraseña

Vamos a crear una acción para el registro del usuario con nombre, email y password. Como es una acción que espera una respuesta de manera asíncrona, necesitamos retornar un callback con el dispatch que nos provee el thunk para la petición de tipo async. La intención de dicha acción, es que podemos crear un nuevo usuario a partir de la contraseña y el email que nos nos proporciona en el formulario, luego hacemos la actualización del nombre para poder mostrarlo dentro de nuestro aplicativo cuando se le de ingreso.

```js
export const startRegisterWithNameEmailPassword = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                await user.updateProfile({ displayName: name })

                dispatch(login(user.uid, user.displayName))
            })
    }
}
```

Está acción la llamamos dentro del componente `<RegisterScreen />` al momento de enviar el formulario, y luego de comprobar que todos los campos son correctos:

```jsx
export const RegisterScreen = () => {
    ...
    const handleRegister = (e) => {
        ...
        isFormValid() && dispatch(startRegisterWithNameEmailPassword(email, password, name))
    }
    ...
}
```

En el caso de que se ingrese un correo existente para registrar a un nuevo usuario, firebase nos entrega un error, el cual debemos manejar, por el momento solo lo vamos a atrapar al momento del usar la acción:

```js
export const startRegisterWithNameEmailPassword = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {...})
            .catch(error => console.log(error))
    }
}
```

## Realizar el login de usuario con correo y contraseña

Dentro del componente `<LoginScreen />` vamos a darle una validación a los campos, y en caso de error, mostrar el mensaje necesario. Para ello primero creamos la función para validad los campos y lo usamos dentro de la función que se ejecuta al hacer submit:

```jsx
export const LoginScreen = () => {
    ...
    const handleLogin = (e) => {
        e.preventDefault()
        isFormValid() && dispatch(startLoginEmailPassword(email, password))
    }

    const isFormValid = () => {
        if (!validator.isEmail(email)) {
            dispatch(setError('Email is required'))
            return false
        }
        else if (password.length < 5) {
            dispatch(setError('Password is required'))
            return false
        }
        dispatch(removeError())
        return true
    }
    ...
}
```

Luego usamos el hook `useSelector` para poder obtener la información del estado del store, más específicamente el objeto de los errores:

```jsx
export const LoginScreen = () => {
    ...
    const { msgError } = useSelector(state => state.ui)
    ...
    return (
        <>
            <h3 className="auth__title">Login</h3>
            <form onSubmit={handleLogin}>
                {
                    msgError && <div className="auth__alert-error">{msgError}</div>
                }
                ...
            </form>
        </>
    )
}
```

Para evitar que cuando se cambie de ruta entre login y logout, se mantenga lo errores de la ruta anterior, vamos a darle funcionalidad al evento onClick de los componentes `<Link />`, disparando la acción de remover el error:

```jsx
<Link ... onClick={() => dispatch(removeError())}>...</Link>
```

Ahora, para poder darle una funcionalidad completa a la acción de ingreso con correo y contraseña vamos a hacer lo siguiente:

```js
export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName))
            })
            .catch(error => console.log(error))
    }
}
```

## Tarea: Loading State

Lo primero que vamos a hacer es crear 2 nuevos tipos dentro de `types.js`:

```js
export const types = {
    ...,
    uiStartLoading: '[UI] Start Loading',
    uiFinishLoading: '[UI] Finish Loading'
}
```

Luego definimos las 2 acciones en el `uiReducer` con el fin de cambiar el loading dentro del estado:

```js
export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        ...
        case types.uiStartLoading: return { ...state, loading: true }
        case types.uiFinishLoading: return { ...state, loading: false }
        ...
    }
}
```

Dentro del archivo `ui.js` vamos a crear 2 acciones que nos permitan hacer el cambio del loading:

```js
export const startLoading = () => ({ type: types.uiStartLoading })

export const finishLoading = () => ({ type: types.uiFinishLoading })
```

Estas 2 acciones serán despachadas dentro de la acción `startLoginEmailPassword`. Una vez se llama la acción de dispara el loading, y hasta que no se obtiene respuesta, no cambia el estado de loading:

```js
export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading())
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName))
                dispatch(finishLoading())
            })
            .catch(error => {
                console.log(error)
                dispatch(finishLoading())
            })
    }
}
```

Para bloquear los botones de login o de register, necesitamos obtener la propiedad de loading mediante el hook `useSelector`:

```jsx
export const LoginScreen = () => {
    ...
    const { loading, msgError } = useSelector(state => state.ui)
    ...
    return (
        <>
            <h3 className="auth__title">Login</h3>
            <form onSubmit={handleLogin}>
                ...
                <button type='submit' className="btn btn-primary btn-block" disabled={loading}>Login</button>
                ...
            </form>
        </>
    )
}
```

Podemos hacer lo mismo para la acción de `startRegisterWithNameEmailPassword` (disparar si está cargando o no), y el disabled del botón en el componente `<RegisterScreen />`

## Mantener el estado de la autenticación al recargar

Dentro del componente `<AppRouter />` vamos a tener un efecto con el que creamos un Observable que nos permita observar el estado de cambio en el Auth del usuario. El observable se va a lanzar cada que modifique la información del usuario, por ejemplo con un registro, un login como email y contraseña o el ingreso con una cuenta de google. Necesitamos que cuando se lleve a cabo el efecto, se realice un dispatch a la acción del login con las credenciales del usuario, en caso de que el mismo exista. El efecto tiene la dependencia del dispatch, el cual puede cambiar.

```jsx
export const AppRouter = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            user?.uid && dispatch(login(user.uid, user.displayName))
        })
    }, [dispatch])
    ...
}
```

Ahora, cada que ingresamos a nuestra aplicación, como tenemos credenciales de usuario, podemos acceder a lo que sería nuestra zona privada, pero la protección de rutas se hará en clases siguientes.

## Mostrar un loading global en la aplicación

Vamos a crear una bandera que nos permita saber cuando se está obteniendo la información del usuario o no, con el fin de poder mostrar algo mediante renderizado condicional, apoyándonos en dicha bandera.

```jsx
export const AppRouter = () => {
    ...
    const [checking, setChecking] = useState(true)

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            ...
            setChecking(false)
        })
    }, [..., setChecking])

    if (checking) return <h1>Loading...</h1>

    return (...)
}
```

Vamos a crear otra bandera para saber si el usuario está logeado o no, esto con el fin de poder hacer la protección de las rutas:

```jsx
export const AppRouter = () => {
    ...
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user?.uid) {
                ...
                setIsLoggedIn(true)
            } else {
                setIsLoggedIn(false)
            }
            ...
        })
    }, [..., setIsLoggedIn])
    ...
}
```

## Logout de Firebase

Necesitamos crear una nueva acción dentro de `auth.js`, que nos permita limpiar la información del usuario dentro del state del store, y esto lo hacemos al crear una acción que use el tipo de logout:

```js
export const logout = () => ({ type: types.logout })
```

Está acción la llamamos dentro de otra acción asíncrona que se encarga de cerrar la sesión dentro de Firebase:

```js
export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut()
        dispatch(logout())
    }
}
```

En el componente `<Sidebar />` vamos a darle funcionalidad al evento onClick del botón de logout, llamado a la última acción creada:

```jsx
export const Sidebar = () => {

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(startLogout())
    }

    return (
        <aside className="journal__sidebar">
            <div className="journal__sidebar-navbar">
                ...
                <button className="btn" onClick={handleLogout}>Logout</button>
            </div>
            ...
        </aside>
    )
}
```

## Protección de Rutas

Vamos a crear 2 componentes: `<PrivateRoute />` y `<PublicRoute />`:

> Recordar que para esta aplicación estamos usando react-router-dom v5, por lo que es muy diferente a la manera a la que aplicamos en la aplicación de las secciones anteriores, en donde usamos react-router-dom v6

```jsx
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'


export const PrivateRoute = ({ isLoggedIn, component: Component, ...rest }) => {
    return <Route {...rest} component={(props) => isLoggedIn ? <Component {...props} /> : <Redirect to="/auth/login" />} />
}


PrivateRoute.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
```

```jsx
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'


export const PublicRoute = ({ isLoggedIn, component: Component, ...rest}) => {
    return <Route {...rest} component={(props) => isLoggedIn ? <Redirect to="/" /> : <Component {...props} /> } />
}


PublicRoute.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
```

Dentro del componente `<AppRouter />` hacemos la protección de las rutas:

```jsx
export const AppRouter = () => {
    ...
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    ...
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <PublicRoute path='/auth' isLoggedIn={isLoggedIn} component={AuthRouter} />
                    <PrivateRoute exact path='/' isLoggedIn={isLoggedIn} component={JournalScreen} />
                    <Redirect to='/auth/login' />
                </Switch>
            </BrowserRouter>
        </>
    )
}
```

## Mensajes de error

Vamos a usar la librería sweetalert2, por lo que usamos el comando `yarn add sweetalert2`. Dentro del archivo de acciones del auth hacemos la importación del paquete:

```js
import Swal from 'sweetalert2'
```

Dentro de la acción de iniciar sesión con el email y contraseña usamos la alerta en caso de error:

```js
export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        ...
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(...)
            .catch(error => {
                ...
                Swal.fire('Error', error.message, 'error')
            })
    }
}
```

También vamos a implementar la alerta dentro de la acción de registro:

```js
export const startRegisterWithNameEmailPassword = (email, password, name) => {
    return (dispatch) => {
        ...
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(...)
            .catch(error => {
                ...
                Swal.fire('Error', error.message, 'error')
            })
    }
}
```
