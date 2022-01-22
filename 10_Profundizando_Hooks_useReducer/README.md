# Sección 10: Profundizando Hooks - useReducer

- useReducer
- Reducers
- Teoría de un reducer
- Aplicación de TODOs
- CRUD local

Esta es una sección dedicada a comprender el concepto de un Reducer, el cual es sumamente importante para poder entrar a Redux o bien usar el contextAPI fácilmente.

## Introducción al concepto de un reducer

Un reducer es una función común y corriente que debe ser pura, es decir que todo lo que la función realice se debe resolver de manera interna. Estas funciones siempre deben retornar un nuevo estado. Usualmente solo reciben 2 argumentos: el valor inicial y la acción a ejecutar.

Al ser una función pura, se deben tener en cuenta los siguientes aspectos: No debe tener efectos secundarios, es decir que todo se debe resolver dentro de la misma sin tener que llamar a otras funciones. No debe realizar tareas asíncronas. Siempre debe retornar un estado nuevo. No debe de llamar el Local Storage o el Session Storage dentro del reducer. No debe de requerir más que una acción que puede o no tener un argumento.

El ciclo de vida de un reducer es el siguiente: Al iniciar la aplicación se tiene un estado inicial, luego el componente se muestra en pantalla con el contenido del State. La página o la vista crea una acción para poder mutar el State. Dicha acción es la que le enviamos al reducer, el cual contiene todo el mapa de las acciones que se pueden realizar. Una vez se mute el state, se repite el ciclo. De esta manera toda la información fluye de manera controlada y en una sola via.

## Idea general de un reducer - Vía código

Vamos a seguir usando la aplicación de la sección anterior. Para instalar los node_modules usamos el comando `npm i`, y para levantar el proyecto usamos el comando `npm start` o `yarn start`. Creamos un archivo llamado `components/08-useReducer/intro-reducer.js`, en donde vamos a crear un reducer de manera simple:

- Lo primero es tener un estado inicial:

    ```js
    const initialState = [{
        id: 1,
        todo: 'Comprar pan',
        done: false
    }]
    ```

- Luego podemos crear el reducer que va a retornar un nuevo estado tomando en cuenta el tipo de la acción que se pasa por argumento. En este caso queremos agregar un nuevo elemento, y este último se encuentra en el payload de la acción:

    ```js
    const todoReducer = (state = initialState, action) => {
        if (action?.type === 'agregar') {
            return [...state, action.payload]
        }
        return state
    };
    ```

- Creamos una instancia del reducer:

    ```js
    let todos = todoReducer()
    ```

- Fabricamos un nuevo objeto para nuestro estado:

    ```js
    const newTodo = [{
        id: 2,
        todo: 'Comprar leche',
        done: true
    }]
    ```

- Definimos un objeto que hará las veces de acción, en el que pasamos el tipo y payload que requiere el reducer:

    ```js
    const agregarTodoAction = {
        type: 'agregar',
        payload: newTodo
    }
    ```

- Cambiamos el valor de la instancia del reducer con el nuevo valor:

    ```js
    todos = todoReducer(todos, agregarTodoAction)

    console.log(todos)
    ```

## useReducer - TodoList

Vamos a crear el componente `<TodoApp />`, en el cual empleamos el hook `useReducer` con los parámetros de la función reducer que creamos en un nuevo archivo, y un valor inicial. Del valor que retorna el hook, por el momento solo tomamos la primera posición para tener las lista de `todos`.

```jsx
import React, { useReducer } from 'react';
import { todoReducer } from './todoReducer';


const initialState = [{
    id: new Date().getTime(),
    desc: 'Aprender React',
    done: false
}] 


export const TodoApp = () => {

    const [todos] = useReducer(todoReducer, initialState)

    return (
        <>
            <h2>TodoApp</h2>
            <hr />

            <ul>
                <li>Hola</li>
                <li>Mundo</li>
                <li>De nuevo</li>
            </ul>
        </>
    );
};
```

Dentro del archivo `todoReducer` creamos la función reductora que recibe un estado (por defecto un arreglo vacío), y las acciones, las cuales dependiendo el tipo haremos algo:

```js
export const todoReducer = (state = [], action) => {
    switch (action.type) {
        case 'add': break;
    
        default: return state;
    }
}
```

## Creando el cascaron de la lista de TODOs

Por el momento vamos a crear un cascarón para la lista de TODOs, más adelante se puede dar la oportunidad de separar por componentes:

```jsx
export const TodoApp = () => {
    ...
    return (
        <>
            ...
            <div className="row">
                <div className="col-sm-12 col-md-8">
                    <ul className="list-group list-group-flush">
                        {todos.map(({ id, desc }, i) =>  (
                            <li key={i} className="list-group-item">
                                <p className="text-center">{i + 1}. {desc}</p>
                                <button className="btn btn-danger">Eliminar</button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="col-sm-12 col-md-4">
                    <h2>Agregar TODO</h2>
                    <hr />

                    <form className="form-group">
                        <input className="form-control" type="text" name="desc" placeholder="Aprender ..." />
                        <button className="btn btn-outline-primary w-100 mt-3">Agregar</button>
                    </form>
                </div>
            </div>
        </>
    );
};
```
