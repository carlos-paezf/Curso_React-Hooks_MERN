# Sección 20: Introducción a Redux y Autenticación en Firebase

- Redux aplicado en nuestro proyecto
- Firebase
- FireStore
- Redux Devtools
- Thunk
- Formularios
- Google SingIn
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
