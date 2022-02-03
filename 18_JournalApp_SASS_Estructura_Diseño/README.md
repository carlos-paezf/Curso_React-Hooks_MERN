# Sección 18: JournalApp - SASS - Estructura y Diseño

- SASS
- Diseño completo de la aplicación de forma manual
- Uso de funciones de SASS
- Configuración y uso de parciales
- Transiciones en SASS

Esta sección está totalmente enfocada en aprender a utilizar SASS para crear nuestro estilo de la aplicación, la cual haremos todo nosotros de absoluto cero.

## Inicio del proyecto - JournalApp

Vamos a crear un nuevo proyecto con el comando `yarn create react-app journal-app`, luego levantamos el proyecto con el comando `yarn start`. Vamos a crear un componente llamado `<JournalApp />` que será el componente principal. También vamos a crear una carpeta llamada `styles`, dentro del cual creamos un archivo llamado `styles.scss` que vamos a importar dentro de `index.js`:

```js
import './styles/styles.scss'
```

Es importante instalar SASS, por lo que usamos el comando `yarn add node-sass` ya que hemos decidido usar yarn en todo el proyecto.

## Nota de actualización - React Router V5 y V6

Al momento de realizar el curso, se tienen 2 versiones, la v5 la cual es más usada, y la v6, la cual contiene muchos cambios con respecto al anterior. Para poder instalar la versión 5 mediante la línea de comandos, usamos la instrucción `yarn add react-router-dom@5.3.0`.

## Implementando rutas principales y rutas hijas

Vamos a crear algunos componentes para la página de Login y de Register dentro de los directorios `src/components/auth/`. Y dentro del directorio `src/components/journal` creamos un componente para la pantalla del Journal.

Procedemos a crear 2 archivos para la configuración de las rutas. El primero es para las rutas principales, por lo que el componente se llama `<AppRouter />`:

> Importante recordar que se está haciendo uso de la v5 de react-router-dom

```jsx
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { AuthRouter } from '.';
import { JournalScreen } from '../components/journal';


export const AppRouter = () => {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route path='/auth' component={AuthRouter} />
                    <Route exact path='/' component={JournalScreen} />
                    <Redirect to='/auth/login' />
                </Switch>
            </BrowserRouter>
        </>
    )
}
```

El siguiente componente es para las rutas de la autenticación, por lo que el componente `<AuthRouter />` tiene la siguiente estructura:

```jsx
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { LoginScreen, RegisterScreen } from '../components/auth';


export const AuthRouter = () => {
    return (
        <>
            <Switch>
                <Route exact path='/auth/login' component={LoginScreen} />
                <Route exact path='/auth/register' component={RegisterScreen} />
                <Redirect to='/auth/login' />
            </Switch>
        </>
    )
}
```

Luego, dentro del componente `<JournalApp />` usamos el componente `<AppRouter />`:

```jsx
const JournalApp = () => {
    return (
        <>
            <AppRouter />
        </>
    )
}
```

## Sass partials

Vamos a crear una nueva carpeta dentro de `styles`, en la cual vamos a añadir algunos ***partials*** que serán llamados desde el archivo `styles.scss`. Es importante que el nombre de los archivos parciales tenga el prefijo `_`. El primer partial que vamos a crear se llamará `_settings.scss` y contiene la siguiente información:

```scss
// Colors
$primary: #5C62C5;
$dark-grey: #363636;
$light-grey: #D8D8D8;
```

La manera en que lo importamos dentro del archivo `styles.scss` será la siguiente:

```scss
@import './base/settings';
```

También vamos a crear otro partial para algunas configuraciones globales, y dicho archivo se llamara `_base.scss`:

```scss
* {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    margin: 0;
}

html,
body {
    height: 100vh;
    width: 100vw;
}

main { width: 100%; }

.mt-1 { margin-top: 5px; }

.mt-5 { margin-top: 20px; }

.mb-1 { margin-bottom: 5px; }

.mb-5 { margin-bottom: 20px; }

.pointer { cursor: pointer; }
```

Importamos el partial dentro de `styles.scss`:

```scss
@import './base/base';
```

## Estilos del AuthRouter

Dentro del componente `<AuthRouter />`, vamos a atrapar las rutas dentro de un div con una clase que procedemos a crear dentro del archivo `styles/components/_auth.scss`:

```jsx
export const AuthRouter = () => {
    return (
        <div className='auth__main'>...</div>
    )
}
```

El archivo partial lo importamos dentro de `styles.scss`:

```scss
...
@import './components/auth';
```

El estilo de la clase será el siguiente:

```scss
.auth__main {
    align-items: center;
    background-color: $primary;
    display: flex;
    justify-content: center;
    margin: 0;
    height: 100vh;
    width: 100vw;
}
```

Luego volvemos a envolver las rutas dentro de una nueva clase:

```jsx
export const AuthRouter = () => {
    return (
        <div className='auth__main'>
            <div className="auth__box-container">...</div>
        </div>
    )
}
```

Dicha clase tendrá el siguiente css:

```scss
.auth__box-container {
    background-color: white;
    box-shadow: 0 3px $dark-grey;
    border-radius: 20px;
    padding: 20px;
    width: 250px;
}
```

Dentro del componente `<LoginScreen />` creamos una pequeña estructura para el ingreso de los usuarios:

```jsx
export const LoginScreen = () => {
    return (
        <>
            <h3>Login</h3>
            <form>
                <input type="text" placeholder="email" name='email' />
                <input type="password" placeholder="password" name='password' />
                <button type='submit'>Login</button>
                <hr />
                google
            </form>
        </>
    )
}
```

## Estilos del LoginScreen

Vamos a ampliar aún más la estructura del `<LoginScreen />`, pero ahora aplicando clases:

```jsx
export const LoginScreen = () => {
    return (
        <>
            <h3 className="auth__title">Login</h3>
            <form>
                <input type="text" className="auth__input" placeholder="Email" name='email' autoComplete='off' />
                <input type="password" className="auth__input" placeholder="Password" name='password' autoComplete='off' />
                <button type='submit' className="btn btn-primary btn-block">Login</button>

                <div className="auth__social-networks">
                    <p>Login with social networks</p>

                    <div className="google-btn">
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>

                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link to="/auth/register">Create new Account</Link>
            </form>
        </>
    )
}
```

Algunas de las clases requieren que los colores que establecimos sean más oscuros o más claros, para ello SASS nos ofrece las funciones `darken()` y `lighten()`. El primer archivo de estilos al que le vamos a hacer modificaciones será al partial `_auth.scss`. Si nos fijamos, estamos usando la estructura `&:___` para poner un estilo en especifico según lo que se necesite por cada clase:

```scss
...

.auth__title {
    color: darken($color: $primary, $amount: 20);
    margin-bottom: 20px;
}

.auth__input {
    color: $dark-grey;
    border: 0;
    border-bottom: 1px solid $light-grey;
    font-size: 16px;
    margin-bottom: 10px;
    height: 20px;
    width: 100%;
    
    transition: border-bottom .3s ease;

    &:focus {
        outline: none;
        border-bottom: 1px solid $primary;
    }
}

.auth__social-networks {
    align-items: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 20px 0;
    width: 100%;
}


.auth__alert-error {
    background-color: red;
    border-radius: 5px;
    color: $white;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    padding: 5px;
}
```

Creamos un nuevo partial para la configuración de los estilos de los botones, por lo que primero hacemos la importación en el archivo `styles.scss`:

```scss
...
@import './components/buttons';
```

Dicho partial va a tener el siguiente estilo:

```scss
.btn {
    background-color: transparent;
    border: none;
    color: $white;
    cursor: pointer;
    font-size: 12px;
    padding: 7px 10px;

    &:focus { outline: none; }
}

.btn-primary {
    background-color: $primary;
    border-radius: 2px;

    transition: background-color .2s ease-in;

    &:disabled { background-color: lighten($color: $primary, $amount: 20); }
    
    &:hover { background-color: darken($color: $primary, $amount: 15); }
}

.btn-block {
    width: 100%;
}

.google-btn {
    cursor: pointer;
    margin-top: 5px;
    width: 100%;
    height: 42px;
    background-color: $google-blue;
    border-radius: 2px;
    box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.25);

    transition: box-shadow .3s ease;

    .google-icon-wrapper {
        position: absolute;
        margin-top: 1px;
        margin-left: 1px;
        width: 40px;
        height: 40px;
        border-radius: 2px;
        background-color: $white;
    }

    .google-icon {
        position: absolute;
        margin-top: 11px;
        margin-left: 11px;
        width: 18px;
        height: 18px;
    }

    .btn-text {
        float: right;
        margin: 11px 40px 0 0;
        color: $white;
        font-size: 14px;
        letter-spacing: 0.2px;
    }

    &:hover { box-shadow: 0 0 6px $google-blue; }

    &:active { background: $button-active-blue; }
}
```

También debemos aclarar que añadimos otras variables para los colores dentro del archivo `_settings.scss`:

```scss
...
$button-active-blue: #1669f2;
$google-blue: #4285f4;
$white: #fff;
```

## Estilos en el RegisterScreen

Vamos a crear un nuevo partial para los links, por lo que hacemos la importación del mismo dentro de `styles.scss`:

```scss
...
@import './components/links';
```

El partial de links tiene el siguiente estilo:

```scss
.link {
    color: $dark-grey;
    text-decoration: none;

    &:hover { text-decoration: underline; }
}
```

Procedemos a configurar las clases de los elementos en el componente `<AuthScreen />`:

```jsx
export const RegisterScreen = () => {
    return (
        <>
            <h3 className="auth__title">Register</h3>
            <form>
                <input type="text" className="auth__input" placeholder="Name" name='name' autoComplete='off' />
                <input type="text" className="auth__input" placeholder="Email" name='email' autoComplete='off' />
                <input type="password" className="auth__input" placeholder="Password" name='password' autoComplete='off' />
                <input type="password" className="auth__input" placeholder="Confirm Password" name='confirm_password' autoComplete='off' />
                <button type='submit' className="btn btn-primary btn-block mb-5">Register</button>

                <Link className='link' to="/auth/login">Already registered?</Link>
            </form>
        </>
    )
}
```

## Sidebar

Vamos a crear un partial para comenzar a configurar los estilos del componente `<JournalScreen />`. El archivo se llamara `_journal.scss` y se debe importar dentro de `styles.scss`:

```scss
@import './components/journal';
```

Vamos a usar los iconos de [font-awesome](https://cdnjs.com/libraries/font-awesome "Font Awesome"), por lo que copiamos el CDN dentro del archivo `index.html`:

```html
<head>
    ...
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
```

El componente `<Sidebar />` va a tener esta apariencia:

```jsx
export const Sidebar = () => {
    return (
        <aside className="journal__sidebar">
            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    <i className="far fa-moon"></i>
                    <span>Ferrer</span>
                </h3>

                <button className="btn">Logout</button>
            </div>

            <div className="journal__new-entry">
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">New Entry</p>
            </div>
        </aside>
    )
}
```

Luego, dentro del partial `_journal.scss` creamos las clases para dicho componente:

```scss
.journal__main-content { 
    display: flex; 
    height: 100vh; 
}

.journal__sidebar {
    background-color: $dark-grey;
    color: $white;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0 10px;
    width: 450px;
}

.journal__sidebar-navbar {
    display: flex;
    justify-content: space-between;

    h3 {
        font-weight: lighter;
        letter-spacing: 1px;
    }
}

.journal__new-entry {
    align-items: center;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 30px;
    width: 100%;

    transition: color .2s ease-in-out;

    &:hover {
        color: darken($color: $white, $amount: 20)
    }
}
```

## Sidebar - JournalEntries

Vamos a crear un nuevo componente llamado `<JournalEntries />`, el cual llamaremos desde `<Sidebar />`:

```jsx
export const Sidebar = () => {
    return (
        <aside className="journal__sidebar">
            ...
            <JournalEntries />
        </aside>
    )
}
```

Dentro del componente `<JournalEntries />` creamos la siguiente estructura:

```jsx
export const JournalEntries = () => {
    const entries = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    
    return (
        <div className="journal__entries">
            {
                entries.map(entry => <JournalEntry key={entry} />)
            }
        </div>
    )
}
```

Por supuesto, también debemos crear el componente `<JournalEntry />`, el cual contrendrá lo siguiente:

```jsx
export const JournalEntry = () => {
    return (
        <div className="journal__entry pointer">
            <div className="journal__entry-picture"
                style={{
                    "backgroundSize": "cover",
                    "backgroundImage": "url(https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                }}></div>

            <div className="journal__entry-body">
                <p className="journal__entry-title">Notas para la app</p>
                <p className="journal__entry-content">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            </div>

            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>20</h4>
            </div>
        </div>
    )
}
```

Los estilos de este último componente lo declaramos dentro del partial `_jounal.scss`:

```scss
.journal__entry {
    background-color: $white;
    border-radius: 5px;
    color: $dark-grey;
    display: flex;
    margin-bottom: 10px;
    overflow: hidden;

    .journal__entry-picture {
        height: 75px;
        width: 75px;
    }

    .journal__entry-body {
        padding: 10px;

        .journal__entry-tittle {
            font-size: 14px;
            font-weight: bold;
        }

        .journal__entry-content {
            font-size: 10px;
        }
    }

    .journal__entry-date-box {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 5px;
        
        span {
            font-size: 12px;
        }
    }
}
```

## Componente cuando no hay nada seleccionado

Vamos a crear un componente llamado `<NothingSelected />`, el cual será llamado dentro de `<JournalScreen />` en caso de que no haya nada seleccionado:

```jsx
export const JournalScreen = () => {
    return (
        <div className="journal__main-content">
            <Sidebar />
            <main>
                <NothingSelected />
            </main>
        </div>
    )
}
```

Dentro del componente `<NothingSelected />` vamos a poner lo siguiente:

```jsx
export const NothingSelected = () => {
    return (
        <div className="nothing__main-content">
            <p>Select something <br /> or create an entry!</p>
            <i className="far fa-star fa-4x mt-5"></i>
        </div>
    )
}
```

También vamos a crear un nuevo partial llamado `_nothing.scss`, el cual debemos importar dentro de `styles.scss`:

```scss
...
@import './components/nothing';
```

Nuestro partial tendrá los siguientes estilos:

```scss
.nothing__main-content {
    align-items: center;
    background-color: $primary;
    color: $white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;

    p {
        text-align: center;
    }
}
```

## NoteAppBar

Vamos a crear un nuevo componente llamado `<NoteScreen />`, y también un partial llamado `_notes.scss`. Este último lo importamos en el archivo `styles.scss`:

```scss
...
@import './components/notes'
```

El componente `<NoteScreen />` lo vamos a usar dentro de `<JournalScreen />`, y este luego se mostrará cuando se haya seleccionado alguna nota:

```jsx
export const JournalScreen = () => {
    return (
        <div className="journal__main-content">
        ...
            <main>
                {/* <NothingSelected /> */}
                <NoteScreen />
            </main>
        </div>
    )
}
```

Luego creamos un componente llamado `<NoteAppBar />`, en el cual tendremos una fecha y 2 botones:

```jsx
export const NotesAppBar = () => {
    return (
        <div className='notes__appbar'>
            <span>El día de hoy</span>
            <div>
                <button className="btn">Picture</button>
                <button className="btn">Save</button>
            </div>
        </div>
    )
}
```

Las clases para este componente están definidas dentro del partial `_notes.scss`:

```scss
.notes__appbar {
    align-items: center;
    background-color: $primary;
    color: $white;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
}
```

También se ha hecho una pequeña modificación dentro del partial `_buttons.scss`, para tener un efecto de hover en los botones:

```scss
.btn {
    ...    
    transition: color .2s linear;
    ...
    &:hover { color: darken($color: $white, $amount: 10); }
}
```

El componente de `<NotesAppBar />` será usado dentro de `<NoteScreen />`:

```jsx
export const NoteScreen = () => {
    return (
        <div className='notes__main-content'>
            <NotesAppBar />
        </div>
    )
}
```

Y de nuevo, la clase de este componentes, se define dentro del partial `_notes.scss`:

```scss
.notes__main-content {
    display: flex;
    flex-direction: column;
    height: 100%;
}
```

## Estructura y diseño del NoteScreen

Dentro de `<NoteScreen />` vamos a crear un input, un textarea y una sección para las imágenes que suba el usuario:

```jsx
export const NoteScreen = () => {
    return (
        <div className='notes__main-content'>
            <NotesAppBar />
            <div className="notes__content">
                <input type="text" placeholder='Some awesome title' className='notes__title-input' autoComplete='off' />
                <textarea placeholder="What happened today?" className='notes__textarea'></textarea>

                <div className="notes__image">
                    <img src="https://images.unsplash.com/photo-1643669528728-191536f9bfba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1277&q=80" alt="img" />
                </div>
            </div>
        </div>
    )
}
```

Luego, dentro del partial `_notes.scss` creamos los estilos:

```scss
...

.notes__content {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 20px;
}

.notes__title-input,
.notes__textarea {
    border: none;

    &:focus { outline: none; }
}

.notes__title-input {
    color: $dark-grey;
    font-size: 25px;
    font-weight: 700;
    margin-bottom: 10px;
}

.notes__textarea {
    border: none;
    color: $dark-grey;
    font-size: 20px;
    flex: 1 1 auto;
    resize: none;
}

.notes__image {
    justify-content: center;
    align-items: center;
    display: flex;
    flex-wrap: wrap;

    img {
        box-shadow: 3px 3px $dark-grey;
        height: 150px;
    }
}
```

Por el momento, todos los componentes tienen información fija, en la siguiente sección empezaremos a usar Redux.
