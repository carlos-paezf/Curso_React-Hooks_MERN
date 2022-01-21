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

## useLayoutEffect

El hook `useLayoutEffect` tiene la firma idéntica al hook `useEffect`, solo que el primero se dispara de manera síncrona después de todas las mutaciones del DOM. Una manera de usar este hook, es para obtener las mediciones de algún elemento dentro del DOM luego de su renderización. Por ejemplo, queremos tomar la medición de un párrafo que se está renderizando en cada petición. A dicho párrafo le vamos a asignar una referencia que nos servirá para poder observar sus propiedades en cada renderización:

```jsx
export const LayoutEffect = () => {
    ...
    const [boxSize, setBoxSize] = useState({});

    const pQuote = useRef();

    useLayoutEffect(() => {
        setBoxSize(pQuote.current.getBoundingClientRect())
    }, [quote]);

    return (
        <>
            ...
            <blockquote className="blockquote d-flex" style={{ "flexDirection" : 'column' }}>
                <p className="mb-2" ref={pQuote}>{quote}</p>
                <pre>{JSON.stringify(boxSize, null, 3)}</pre>
            </blockquote>
            ...
        </>
    );
};
```

## Memo - Método de React

Vamos a crear un componente que actuara como componente padre, en el cual usamos el hook de `useCounter`. Tenemos 2 botones dentro de dicho componente: el primero para incrementar el contador, y el segundo para mostrar u ocultar algo.

```jsx
import React, { useState } from 'react';
import { Small } from '.';
import { useCounter } from '../../hooks';

export const Memorize = () => {

    const { state: counter, increment } = useCounter(10)
    const [show, setShow] = useState(true);

    return (
        <>
            <h2>Counter <Small value={counter} /></h2>
            <hr />
            <button className="btn btn-primary" onClick={() => increment(1)}>+1</button>    
            <button className="btn btn-outline-primary mx-3" onClick={() => setShow(!show)}>Show/Hide {JSON.stringify(show)}</button>    
        </>
    )
};
```

El componente que hace las veces de hijo nos permite saber en que momento se renderiza el componente:

```jsx
export const Small = ({ value }) => {
    console.log('Small se está llamando')

    return <small>{value}</small>;
};
```

Cuando incrementamos el contador, el componente `<Small />` se renderiza cada que presionamos cualquiera de los 2 botones, y esto es algo que React hace cada que detecta el cambio dentro de cualquier estado en el componente, pero esto no es lo que deseamos, ya que por ejemplo si estamos haciendo peticiones HTTP, se harían múltiples veces y saturarían la cantidad de peticiones que podemos hacer.

La manera de solucionar lo anterior, es mediante la función `memo` de react, el cual nos permite almacenar el estado del componente, mediante sus props no cambien:

```jsx
export const Small = React.memo(({ value }) => {
    console.log('Small se está llamando')

    return <small>{value}</small>;
});
```

## useMemo

El hook `useMemo` es bastante recomendable cuando queremos almacenar los resultados de funciones pesadas que solo deben cambiar su valor si una dependencia cambia, más no todo los estados de la aplicación:

```jsx
export const MemoHook = () => {

    const { state: counter, increment } = useCounter(5000)
    ...
    const procesoPesado = (iteraciones) => {
        for (let i = 0; i < iteraciones; i++) {
            console.log(`Realizando Iteración`)
        }
        return `${iteraciones} iteraciones realizadas`
    }

    const memoProcesoPesado = useMemo(() => procesoPesado(counter), [counter]);

    return (
        <>
            <h2>Counter useMemorize {counter}</h2>
            <hr />
            <p>{ memoProcesoPesado }</p>
            ...    
        </>
    )
};
```

## useCallback

Vamos a crear un componente en el cual tenemos un contador, pero el botón de incrementar se implementa de otro componente:

```jsx
export const CallbackHook = () => {

    const [counter, setCounter] = useState(10)

    const increment = () => setCounter(counter + 1)    

    return (
        <>
            <h2>useCallback Hook</h2>
            <hr />

            <ShowIncrement increment={increment} />
        </>
    )
}
```

```jsx
export const ShowIncrement = ({ increment }) => {
    console.log('Generando ShowIncrement')

    return <button className="btn btn-primary" onClick={increment}></button>
};
```

Cada que presionamos el botón, se vuelve a generar el componente, y eso algo que ni siquiera usando `React.memo` podemos solucionar. Esto se debe a que cada que cambia el estado de `<CallbackHook />` la función `increment` va a estar apuntando a un lugar en memoria diferente, haciendo que prácticamente se una función diferente. El hook `useCallback` nos permite almacenar el valor de una función teniendo en cuenta que solo se debe renderizar de nuevo si se cambian las dependencias. En nuestro caso, necesitamos modificar la manera en que hacemos el incremento, puesto que no queremos alterar de manera directa el estado del counter. El hook va a tener la función que se va a almacenar, mientras la dependencia de `setCounter` no se altere:

```jsx
export const CallbackHook = () => {

    const [counter, setCounter] = useState(10)

    const increment = useCallback(() => setCounter(prev => prev + 1), [setCounter])

    return (
        <>
            <h2>useCallback Hook: {counter}</h2>
            <hr />

            <ShowIncrement increment={increment} />
        </>
    )
}
```

Dentro del componente `<ShowIncrement />` debemos hacer que ahora se almacene el estado de su renderización:

```jsx
export const ShowIncrement = React.memo(...)
```

Si queremos pasar argumentos a la función del `useCallback`, podemos hacer los siguiente:

```jsx
export const CallbackHook = () => {
    ...
    const increment = useCallback((n) => setCounter(prev => prev + n), [setCounter])
    ...
}
```

```jsx
export const ShowIncrement = React.memo(({ increment }) => {
    return <button className="btn btn-primary" onClick={() => increment(5)}>+5</button>
});
```

## Tarea Memorize

Tenemos 2 componentes:

```jsx
import React, { useState } from 'react';
import { Hijo } from '.';

export const Padre = () => {
    const numeros = [2, 4, 6, 8, 10]
    const [valor, setValor] = useState(0)

    const incrementar = (n) => setValor(valor + n)

    return (
        <>
            <h2>Padre</h2>
            <p>Total: {valor}</p>
            <hr />
            {
                numeros.map(n => <Hijo key={n} numero={n} incrementar={incrementar} />)
            }
        </>
    );
};
```

```jsx
import React from 'react';
import PropTypes from 'prop-types'


export const Hijo = ({ numero, incrementar }) => {
    console.log('Generando Hijo')
    return <button className="btn btn-primary mx-3" onClick={() => incrementar(numero)}>{numero}</button>;
};


Hijo.propTypes = {
    numero: PropTypes.number.isRequired,
    incrementar: PropTypes.func.isRequired
}
```

La idea es que el componente Hijo solo se renderice las primeras 5 veces y pueda conservar su estado en cada botón, no queremos el comportamiento de que cada que presionamos uno de los botones se renderice 5 veces más. La solución es usar useCallback para retornar una versión memorizada de la función para incrementar mientras no cambien las dependencias del hook:

```jsx
export const Padre = () => {
    ...
    // const incrementar = (n) => setValor(valor + n)
    const incrementar = useCallback((n) => setValor(prev => prev + n), [setValor])
    ...
};
```

Luego, el componente Hijo lo atrapamos con `React.memo` para tener una versión guardada de su renderización mientras no cambien los props:

```jsx
export const Hijo = React.memo(({ numero, incrementar }) => {...});
```
