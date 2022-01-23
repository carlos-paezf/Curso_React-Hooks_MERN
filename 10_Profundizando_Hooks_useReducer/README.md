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

## Agregar un nuevo TODO

Vamos a iniciar creando el método para el envío del formulario. La idea es que no refresque la página en cada envío, y que teniendo el cuenta el nuevo elemento o TODO que se crea, se pueda enviar al reducer mediante un action. Aún no estamos capturando los valores del formulario:

```jsx
export const TodoApp = () => {
    ...
    const handleSubmit = (e) => {
        e.preventDefault()
        const newTodo = {
            id: new Date().getTime(),
            desc: 'Nueva tarea',
            done: false
        }
        const action = {
            type: 'add',
            payload: newTodo
        }
    }
    ...
}
```

Ahora el reducer debe tener este aspecto cuando el tipo es de agregar:

```jsx
export const todoReducer = (state = [], action) => {
    switch (action.type) {
        case 'add': return [...state, action.payload]    
        default: return state;
    }
}
```

Para poder enviar el action al reducer hacemos uso del argumento `dispatch` que se retorna del hook useReducer:

```jsx
export const TodoApp = () => {

    const [todos, dispatch] = useReducer(todoReducer, initialState)

    const handleSubmit = (e) => {
        ...
        dispatch(action)
    };
    ...
}
```

## Guardar TODOs en el Local Storage

Lo primero que vamos a hacer, es capturar lo que se ingresa mediante el input, para ello usamos el hook personalizado `useForm`:

```jsx
export const TodoApp = () => {

    const [{ desc }, handleInputChange] = useForm({
        desc: ''
    })
    ...
    const handleSubmit = (e) => {
        ...
        if (desc.trim().length < 1) return
        const newTodo = {
            id: new Date().getTime(),
            desc: desc,
            done: false
        }
        ...
    };
    

    return (
        <>
            ...
            <div className="row">
                ...
                <div className="col-sm-12 col-md-4">
                    ...
                    <form onSubmit={handleSubmit} className="form-group">
                        <input type="text" name="desc" value={desc} onChange={handleInputChange} className="form-control" placeholder="Aprender ..." />
                        ...
                    </form>
                </div>
            </div>
        </>
    )
}
```

Para poder hacer un reset a los campos del formulario, vamos a exportar un nuevo método dentro del custom hook:

```js
export const useForm = (initialState = {}) => {
    ...
    const reset = () => setValues(initialState)
    ...
    return [ values, handleInputChange, reset ]
}
```

Luego dentro del componente `<TodoApp />` usamos dicha función:

```jsx
export const TodoApp = () => {

    const [{ desc }, handleInputChange, reset] = useForm({
        desc: ''
    })
    ...
    const handleSubmit = (e) => {
        ...
        reset()
    }
    ...
}
```

Vamos a usar el tercer parámetro del hook useReducer llamado `init`, el cual se usa para crear un estado inicial de manera diferida:

```jsx
const init = () => {
    return [{
        id: new Date().getTime(),
        desc: 'Aprender React',
        done: false
    }]
}

export const TodoApp = () => {
    const [todos, dispatch] = useReducer(todoReducer, [], init)
    ...
}
```

Lo que queremos hacer es poder guardar los TODOs dentro del localStorage mediante el `useEffect` cada que cambia la dependencia de la lista de TODOs, y mediante el método de inicialización diferida poder obtener los elementos que están en el Local Storage y darlos como punto inicial del `useReducer`. En caso de no haya nada en el localStorage, entonces se inicia como un arreglo vacío:

```jsx
const init = () => JSON.parse(localStorage.getItem('todos')) || []


export const TodoApp = () => {
    const [todos, dispatch] = useReducer(todoReducer, [], init)
    ...
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])
    ...
}
```

## Borrar un TODO

Primero vamos a definir el tipo de acción dentro de la función `todoReducer`:

```js
export const todoReducer = (state = [], action) => {
    switch (action.type) {
        ...
        case 'delete': return state.filter(todo => todo.id !== action.payload)
        default: return state;
    }
}
```

Luego dentro del componente `<TodoApp />` creamos la función que va a eliminar el TODO teniendo en cuenta el id que se ingresa por parámetro:

```jsx
export const TodoApp = () => {
    ...
    const handleDelete = (todoId) => {
        const action = {
            type: 'delete',
            payload: todoId
        }
        dispatch(action)
    }

    return (
        <>
            ...
            <div className="row">
                <div className="col-sm-12 col-md-8">
                    <ul className="list-group list-group-flush">
                        {todos.map(({ id, desc }, i) => (
                            <li key={i} className="list-group-item">
                                ...
                                <button onClick={() => handleDelete(id)} className="btn btn-danger">Eliminar</button>
                            </li>
                        ))}
                    </ul>
                </div>
                ...
            </div>
        </>
    )
}
```

## Toggle Todo - Marcar como completado o pendiente un TODO

Creamos la acción dentro del reducer para poder cambiar la propiedad `done` de cada TODO dependiendo del id que se pasa por el payload:

```jsx
export const todoReducer = (state = [], action) => {
    switch (action.type) {
        ...
        case 'toggle': return state.map(todo => {
            if (todo.id === action.payload) {
                return {...todo, done: !todo.done}
            } else {
                return todo
            }
        })

        default: return state;
    }
}
```

Una manera más corta de hacer el return de la acción, es mediante un return explicito:

```js
export const todoReducer = (state = [], action) => {
    switch (action.type) {
        ...
        case 'toggle': return state.map(todo => (todo.id === action.payload) ? {...todo, done: !todo.done} : todo)

        default: return state;
    }
}
```

Luego dentro del componente `<TodoApp />` implementamos la funcionalidad en el párrafo de cada TODO:

```jsx
export const TodoApp = () => {
    ...
    const handleToggle = (todoId) => {
        dispatch({
            type: 'toggle',
            payload: todoId
        })
    };


    return (
        <>
            ...
            <div className="row">
                <div className="col-sm-12 col-md-8">
                    <ul className="list-group list-group-flush">
                        {todos.map(({ id, desc, done }, i) => (
                            <li key={i} className="list-group-item">
                                <p onClick={() => handleToggle(id)} className={done && "complete"}>{i + 1}. {desc}</p>
                                ...
                            </li>
                        ))}
                    </ul>
                </div>
                ...
            </div>
        </>
    )
}
```

## Optimización #1 - Listado de TODOs

Vamos a crear el componente `<TodoList />` en donde tenemos la lista de los TODOs teniendo en cuenta los props que se le envían:

```jsx
import React from 'react';
import { TodoListItem } from '.';
import PropTypes from 'prop-types'


export const TodoList = ({ todos, handleToggle, handleDelete }) => {
    return (
        <>
            <ul className="list-group list-group-flush">
                {todos.map((todo, i) => <TodoListItem key={i} i={i} todo={todo} handleToggle={handleToggle} handleDelete={handleDelete} />)}
            </ul>
        </>
    );
};


TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
    handleToggle: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
}
```

Como nos damos cuenta, tenemos otro componente llamado `<TodoListItem />` en donde pasamos el indice y el elemento. Pero si nos fijamos, tenemos que seguir enviando la referencia de las funciones, algo que se soluciona más adelante con los contextos:

```jsx
import React from 'react';
import PropTypes from 'prop-types'


export const TodoListItem = ({ i, todo, handleToggle, handleDelete }) => {
    const { id, desc, done } = todo

    return (
        <>
            <li key={i} className="list-group-item">
                <p onClick={() => handleToggle(id)} className={done && "complete"}>{i + 1}. {desc}</p>
                <button onClick={() => handleDelete(id)} className="btn btn-danger">Eliminar</button>
            </li>
        </>
    );
};


TodoListItem.propTypes = {
    i: PropTypes.number.isRequired,
    todo: PropTypes.object.isRequired,
    handleToggle: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
}
```

## Optimización #2 - Agregar TODO

Lo que vamos a hacer es crear un nuevo componente llamado `<TodoAdd />`:

```jsx
import React from 'react';
import { useForm } from '../../hooks';
import PropTypes from 'prop-types'


export const TodoAdd = ({ handleAddTodo }) => {
    const [{ desc }, handleInputChange, reset] = useForm({
        desc: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (desc.trim().length < 1) return
        const newTodo = {
            id: new Date().getTime(),
            desc: desc,
            done: false
        }
        handleAddTodo(newTodo)
        reset()
    }

    return (
        <>
            <h2>Agregar TODO</h2>
            <hr />

            <form onSubmit={handleSubmit} className="form-group">
                <input type="text" name="desc" value={desc} onChange={handleInputChange} className="form-control" placeholder="Aprender ..." />
                <button className="btn btn-outline-primary w-100 mt-3" type="submit">Agregar</button>
            </form>
        </>
    );
}; 


TodoAdd.propTypes = {
    handleAddTodo: PropTypes.func.isRequired
}
```

Dentro del componente `<TodoApp />` quedamos con lo siguiente:

```jsx
import React, { useEffect, useReducer } from 'react';
import { TodoAdd, TodoList } from '.';
import { todoReducer } from './todoReducer';


const init = () => JSON.parse(localStorage.getItem('todos')) || []


export const TodoApp = () => {

    const [todos, dispatch] = useReducer(todoReducer, [], init)

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const handleDelete = (todoId) => { 
        dispatch({
            type: 'delete',
            payload: todoId
        })
    };

    const handleToggle = (todoId) => {
        dispatch({
            type: 'toggle',
            payload: todoId
        })
    };

    const handleAddTodo = (newTodo) => {
        dispatch({
            type: 'add',
            payload: newTodo
        })
    };
    


    return (
        <>
            <h2>TodoApp ( {todos.length} )</h2>
            <hr />

            <div className="row">
                <div className="col-sm-12 col-md-8">
                    <TodoList todos={todos} handleToggle={handleToggle} handleDelete={handleDelete} />
                </div>

                <div className="col-sm-12 col-md-4">
                    <TodoAdd handleAddTodo={handleAddTodo} />
                </div>
            </div>
        </>
    )
}
```
