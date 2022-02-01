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
