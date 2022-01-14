# Sección 2: Introducción a React y conceptos generales

- ¿Qué es React?
- Conceptos generales
- Babel
- JSX

Daremos nuestros primeros pasos y una pequeña aplicación que nos ayudará a perderle el miedo a React rápidamente

## ¿Qué es REACT?

React es una librería que nos permite crear aplicaciones. Esta hecho para trabajar con aplicaciones de todo tipo de magnitud. Es una librería declarativa, por lo que nos permite manejar patrones de diseño. Es altamente eficiente y predecible. Todo se conforma mediante componentes. Se puede manejar del lado del servidor (Server-side) con Node y también nos permite crear aplicaciones móviles con React Native.

Un código de React simple luce así:

```html
<body>
    <div id="root"></div>
</body>
```

```jsx
const divRoot = document.querySelector('#root')

ReactDOM.render(<h1>Hola mundo</h1>, divRoot)
```

La mezcla anterior es lo que conocemos como JSX, es decir, la unión entre JavaScript y XML. La extensión de los archivo es `.jsx`.

## Primeros pasos en React

Vamos a crear un archivo `index.html` en donde pegaremos èn el header los enlaces para usar la librería de React:

```html
<head>
    <!-- Cargar React -->
    <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
</head>
```

Dentro del body creamos un div con un id, el cual usamos para saber en donde renderizar el contenido que queremos. Luego creamos un script de tipo `text/babel` para que pueda reconocer nuestro contenido JSX:

```html
<body>

    <div id="root"></div>

    <script type="text/babel">
        const divRoot = document.querySelector('#root')
        const h1Tag = <h1>Hola mundo</h1>
        ReactDOM.render(h1Tag, divRoot)
    </script>
</body>
```

Si queremos mostrar el contenido de una variable, podemos usar `{}` para llamarla:

```html
<script type="text/babel">
    const divRoot = document.querySelector('#root')
    const name = 'Ferrer'
    const h1Tag = <h1>Hola mundo, soy { name }</h1>
    ReactDOM.render(h1Tag, divRoot)
</script>
```

## Introducción a Babel

Babel funciona en el background cuando construimos nuestras aplicaciones de React. Babel nos permite usar características actuales de JS en navegadores que aún no reciben dichas características. Por el ejemplo el tema de optional chaining o nullish coalescing operator son características reciente de JS, pero los navergadores no las entienden bien, Babel encarga de generar el código necesario para que se entienda:

- Código de última generación de JS:

    ```js
    const resApi = {
        // characters: ['Batman', 'Superman']
    }

    console.log(resApi.characters?.length)
    ```

- Código compatible con los navegadores:

    ```js
    var _resApi$characters:

    const resApi = { // characters: ['Batman', 'Superman'] 
    }
    console.log((_resApi$character = resApi.characters) == null ? void 0 : _resApi$characters.length )
    ```
