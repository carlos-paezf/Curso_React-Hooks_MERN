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
