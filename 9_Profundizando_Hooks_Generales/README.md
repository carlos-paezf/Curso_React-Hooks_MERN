# Sección 9: Profundizando Hooks - Generales

- Profundizar en el tema de los Hooks
- Crear otros customHooks
- useState
- useCounter - Personalizado
- useEffect y sus precauciones
- useRef
- useFetch - Personalizado + optimizaciones
- useLayoutEffect
- Memo
- useMemo
- useCallback

Estos son los Hooks relativamente simples, aún hay mas que explicaremos más adelante, pero en esta sección nos enfocaremos en estos trabajos y para qué nos pueden servir.

Adicionalmente estaremos dejando las bases para lo que será una sección de pruebas sumamente interesante después.

## Inicio del proyecto - Hooks

Vamos a crear un nuevo proyecto con el comando `npx create-react-app hooks-app`. Para poder levantar el proyecto usamos el comando `npm start` o `yarn start`. Luego hacemos la limpieza de los archivo que no vamos a usar, dejando dentro del directorio `src` solos los archivos `index.js`, `index.css` y `setupTests.js`. Luego creamos un nuevo archivo llamado `HookApp.jsx` en el que vamos a centrar nuestra aplicación:

```js
ReactDOM.render(
    <React.StrictMode>
        <HookApp />
    </React.StrictMode>,
    document.getElementById('root')
);
```

También vamos a usar Bootstrap, por lo que usamos el CDN de la documentación del mismo dentro de `public/index.html`:

```html
<head>
    <!-- CSS Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
</head>
```

## useState

El `useState`  nos permite mutar el estado variables de diversos tipos: string, booleans, number, array, object. Pero debemos tener cuidado cuando usamos la función que nos permite modificar dicho estado. El setter nos permite alterar por complete el contenido de la variable, por lo tanto si tenemos un objeto y solo queremos modificar un único elemento, debemos tener una copia del estado anterior para poder caer sobre ella y modificar la propiedad que queremos.

En el siguiente caso tenemos varios contadores, pero solo queremos alterar 1, por lo tanto cuando usamos la función `setState` creamos un estado anterior y luego modificamos la propiedad que queremos:

```jsx
export const CounterApp = () => {
    const [state, setState] = useState({
        counter1: 10,
        counter2: 20,
        counter3: 30
    });

    const { counter1, counter2 } = state

    const handleAdd = () => {
        setState({
            ...state,
            counter1: counter1 + 1
        })
    };
    

    return (
        <>
            <h2>Counter1: {counter1}</h2>
            <h2>Counter2: {counter2}</h2>
            <hr />
            <button className="btn btn-primary"
                onClick={handleAdd}>
                + 1 Counter1
            </button>
        </>
    )
};
```

## userCounter - CustomHook

Vamos a crear un customHook llamado `hooks/useCounter.js`. En dicho hook solicitamos el estado inicial para el useState, y luego creamos las funciones para incrementar, decrementar o resetear el valor. Por último exportamos el estado y las funciones:

```js
import { useState } from "react";

export const useCounter = (initialState = 10) => {
    const [state, setState] = useState(initialState);

    const increment = (factor = 1) => setState(state + factor)

    const decrement = (factor = 1) => setState(state - factor)

    const reset = () => setState(initialState)

    return { state, increment, decrement, reset };
};
```

Luego creamos un componente llamado `<CounterWithCustomHook />` en el cual usamos las propiedades desestructuradas del customHook, y de ser necesario, pasamos los factores a sumar o restar en las funciones cada que se presionen los botones:

```jsx
export const CounterWithCustomHook = () => {

    const { state: counter, increment, decrement, reset } = useCounter()

    return (
        <>
            <h2>Counter with Custom Hook: {counter}</h2>
            <button className="btn btn-dark" onClick={() => increment(2)}>+ 2</button>
            <button className="btn" onClick={reset}>Reset</button>
            <button className="btn btn-dark" onClick={() => decrement(2)}>- 2</button>
            <hr />
        </>
    )
};
```

## useEffect - SimpleForm

El useEffect actúa al montar el componente y cuando alguna de las dependencias que se le declare sea modificada. Por ejemplo: Vamos a crear un objeto que para almacenar los datos que se atrapen del formulario, luego, creamos un formulario con algunos input que tienen asociados al atributo `value` alguna de las propiedades que creamos en el objeto. Creamos una función que nos permita capturar los datos y guardarlos en el campo correcto teniendo en cuenta el nombre del objetivo y su valor.

Por último creamos 3 `useEffect()` que nos permiten observar su comportamiento, teniendo en cuenta las dependencias que se le asocian.

```jsx
export const SimpleForm = () => {

    const [formState, setFormState] = useState({
        name: '',
        email: ''
    });

    const { name, email } = formState

    useEffect(() => { console.log('Montado del componente') }, []);
    useEffect(() => { console.log('Cambio en el formulario') }, [formState]);
    useEffect(() => { console.log('Cambio en el campo email') }, [email]);

    const handleInputChange = ({ target }) => {
        setFormState({
            ...formState,
            [target.name]: target.value
        })
    };


    return (
        <>
            <h2>useEffect</h2>

            <div className="form-group">
                <input type="text" name="name" value={name} onChange={handleInputChange} className="form-control" placeholder="Tu nombre" autoComplete="off" />
            </div>

            <div className="form-group">
                <input type="email" name="email" value={email} onChange={handleInputChange} className="form-control" placeholder="Tu email" autoComplete="off" />
            </div>
            <hr />
        </>
    );
};
```

## useEffect unmount - CleanUp

Los hooks no se pueden llamar de manera condicional, siempre se requiere que estén al principio del componente. El hook useEffect tiene un retorno en el que podemos desconectar o limpiar acciones en caso de ser necesario, es muy similar a cuando desmontamos un componente. Para observar mejor este comportamiento creamos un componente llamado `<Message />`, el cual va a aparecer cada que se cumpla una condición. Cuando el componente aparece se muestra en consola el mensaje de componente montado, una vez se de deja de cumplir la condición, aparece el mensaje de componente desmontado:

```jsx
export const Message = () => {
    useEffect(() => {
        console.log('componente montado')

        return () => {
            console.log('componente desmontado')
        }
    }, [])

    return (
        <>
            <h3>Eres genial</h3>
        </>
    )
}
```

Dentro del componente `<SimpleForm />` creamos la condición:

```jsx
export const SimpleForm = () => {
    ...
    return (
        <>
            ...
            {(name === 'Ferrer') && <Message />}
        </>
    )
}
```

## useEffect - Precauciones

Los efectos pueden llegar a consumir demasiada memoria si no se controlan. Por ejemplo si tenemos una suscripción a una API y no quitamos la suscripción cada que desmontamos el componente, a la próxima cuando volvamos a montar el componente tendremos 2 suscripciones activas a la vez, si volvemos y desconectamos y montamos de nuevo, ya serán 3 suscripciones, y así sucesivamente. Si estamos con alguna API de pago, esto nos puede llevar a la ruina. La idea es que sepamos en que momento cancelar el efecto. Por ejemplo, aquí tenemos un evento no controlado cuando se desmonte el componente:

```jsx
export const Message = () => {
    useEffect(() => {
        window.addEventListener('mousemove', (e) => {
            const coords = {
                x: e.x,
                y: e.y
            }
            console.log(coords)
        })

        return () => {
            console.log('componente desmontado')
        };
    }, []);

    return <h3>Eres genial</h3>
}
```

Para desconectar el event listener de este caso, extraemos una función de referencia del la acción, para luego remover el evento que la usa:

```jsx
export const Message = () => {
    useEffect(() => {
        const mouseMove = (e) => {
            const coords = {
                x: e.x,
                y: e.y
            }
            console.log(coords)
        }

        window.addEventListener('mousemove', mouseMove)

        return () => {
            window.removeEventListener('mousemove', mouseMove)
            console.log('componente desmontado')
        };
    }, []);

    return <h3>Eres genial</h3>
}
```

Ahora, si queremos, podemos extraer las coordenadas dentro de un useState para luego mostrarlas en el componente:

```jsx
export const Message = () => {
    const [coords, setCoords] = useState({ x: 0, y: 0 });

    const { x, y } = coords

    useEffect(() => {
        const mouseMove = (e) => {
            const coords = {
                x: e.x,
                y: e.y
            }
            setCoords(coords)
        }
        ...
        return () => {...};
    }, []);

    return (
        <>
            <h3>Eres genial</h3>
            <p>x: {x}, y: {y}</p>
        </>
    )
}
```

## Formulario con customHook

Vamos a crear un customHook para poder modificar los campos de un formulario, los cuales se ingresan por parámetros del hook:

```js
import { useState } from "react";

export const useForm = (initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const handleInputChange = ({ target }) => {
        setValues({
            ...values,
            [target.name]: target.value
        })
    }

    return [ values, handleInputChange ]
}
```

Luego dentro del componente `<FormWithCustomHook />` usamos el hook:

```jsx
export const FormWithCustomHook = () => {

    const [ formValues, handleInputChange ] = useForm({
        name: '',
        email: '',
        password: ''
    })

    const { name, email, password } = formValues

    const handleSubmit = (e) => {
        e.preventDefault()
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <h2>Form with Custom Hook</h2>
            <div className="form-group">
                <input type="text" name="name" value={name} onChange={handleInputChange} className="form-control" placeholder="Tu nombre" autoComplete="off" />
            </div>
            ...
            <button className="btn btn-success">Enviar</button>
            <hr />
        </form>
    );
};
```

## useFetch - CustomHook

Vamos a crear un customHook que nos permita hacer la petición a un endpoint que se especifica con el componente. Dicho hook retorna un estado, el cual consiste en la data, en una bandera de si está cargando o no, y un error en caso de que ocurra:

```js
import { useEffect, useState } from "react";

export const useFetch = (url) => {
    const [state, setState] = useState({
        data: null,
        loading: true,
        error: null
    });

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setState( {
                    data,
                    loading: false,
                    error: null
                })
            })
            .catch(error => {
                setState({
                    data: null,
                    loading: false,
                    error
                })
            })
    }, [url]);
    
    return state
};
```

Luego en el componente `<MultipleCustomHook />` usamos el hook `useFetch`:

```jsx
export const MultipleCustomHooks = () => {

    const data = useFetch('https://www.breakingbadapi.com/api/quotes/1')
    console.log(data)

    return (
        <>
            <h1>Multiple CustomHooks</h1>
        </>
    );
};
```

## useFetch + useCounter

Lo primero que vamos a hacer es desestructurar la data y el loading de la data que se obtiene de la petición al endpoint de la API. Luego tomamos el autor y la cita cuando la data ya exista, de lo contrario será undefined. Con todos los datos listos, podemos hacer el renderizado condicional para cuanto está cargando, y en caso contrario mostrar la cita.

```jsx
export const MultipleCustomHooks = () => {

    const { data, loading } = useFetch('https://www.breakingbadapi.com/api/quotes/1')

    const { author, quote } = !!data && data[0]

    return (
        <>
            <h2>Multiple CustomHooks - Breaking Bad Quotes</h2>
            <hr />
            {
                loading
                    ? <div className="alert alert-info">...Loading...</div>
                    : <blockquote className="blockquote">
                        <p className="mb-2">{quote}</p>
                        <footer className="blockquote-footer">{ author }</footer>
                    </blockquote>
            }
        </>
    );
};
```

Ahora vamos a usar el hook de `useCounter` con el fin de poder ir cambiando de cita:

```jsx
export const MultipleCustomHooks = () => {

    const { state, increment } = useCounter(1)

    const { data, loading } = useFetch(`https://www.breakingbadapi.com/api/quotes/${state}`)
    ...

    return (
        <>
            ...
            <button className="btn btn-dark" onClick={() => increment(1)}>Siguiente Cita</button>
        </>
    );
};
```

También vamos a añadirle un pequeño cambio al hook `useFetch` con el el fin de que se aplique de manera correcta el loading:

```js
export const useFetch = (url) => {
    ...
    useEffect(() => {
        setState({ data: null, loading: true, error: null })
        ...
    }, [url]);
    ...
};
```

## useRef - Primer Uso

Vamos a crear un componente llamado `<FocusScreen />`, en el cual por medio de un botón enfocamos un input. La primera manera que vamos a usar, es por medio de `querySelector()`:

```jsx
export const FocusScreen = () => {

    const handleClick = () => {
        document.querySelector('#input-focus').focus()
    };
    

    return (
        <>
            <h2>Focus Screen</h2>
            <hr />
            <input id="input-focus" type="text" className="form-control" placeholder="Su nombre" />
            <button onClick={handleClick} className="btn btn-outline-primary mt-3">Focus</button>
        </>
    );
};
```

Pero ahora tenemos el hook `useRef` de React que nos permite la misma funcionalidad:

```jsx
export const FocusScreen = () => {

    const inputRef = useRef();

    const handleClick = () => {
        inputRef.current.focus()
    };
    

    return (
        <>
            <h2>Focus Screen</h2>
            <hr />
            <input ref={inputRef} type="text" className="form-control" placeholder="Su nombre" />
            <button onClick={handleClick} className="btn btn-outline-primary mt-3">Focus</button>
        </>
    );
};
```

## useRef - Caso de uso real

Un caso real en el que podemos aplicar el useRef, es en el caso de usarlos como una bandera para saber cuando está montado o desmontado el hook. Por ejemplo en el caso de `useFetch` vamos a poner la referencia, y luego cambiamos el valor en el cleanup de un useEffect, y dependiendo del estado de dicha referencia se envía la data:

```js
export const useFetch = (url) => {

    const isMounted = useRef(true);
    ...
    useEffect(() => {
        return () => {
            isMounted.current = false
        }
    }, []);


    useEffect(() => {
        setState({ data: null, loading: true, error: null })
        fetch(url)
            ...
            .then(data => {
                if (isMounted.current) {
                    setState({
                        data,
                        loading: false,
                        error: null
                    })
                } else {
                    console.log('setState no se llamo')
                }
            })
            ...
    }, [url]);
    ...
};
```
