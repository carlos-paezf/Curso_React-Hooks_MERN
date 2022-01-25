# Sección 12: Pruebas unitarias y de integración - Hooks

- Pruebas sobre Hooks y CustomHooks

Ese es el tema principal, demostrar cómo podemos evaluar cada unos de los hooks aplicados anteriormente con sus casos reales de uso. Hay varios extras, como la prueba de un Reducer, que realmente no es nada complicado.

## Inicio del proyecto - Pruebas sobre Hooks

Vamos a emplear el proyecto que se ha trabajado en las últimas secciones. La instalación de los node_modules lo hacemos con el comando `npm i`. Para entrar en el modo de test corremos el comando `npm test` o `yarn test`. Necesitamos hacer algunas instalaciones primero:

Vamos a usar Enzyme y Enzyme-to-Json, por lo que empleamos el comando `npm install --save-dev @wojtekmaj/enzyme-adapter-react-17` y `npm install --save-dev enzyme-to-json`. Configuramos ambos paquetes dentro de setupTests.js de la siguiente manera:

```js
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

import { createSerializer } from 'enzyme-to-json'


Enzyme.configure({ adapter: new Adapter() })
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }))
```

También necesitamos hacer la instalación de la librería ***react-hooks-testing-library*** con el comando `npm install --save-dev @testing-library/react-hooks`.

El primer test que vamos a hacer será al componente `<HookApp />`. Vamos a tomar un snapshot, con el que luego hacemos comparaciones:

```jsx
import React from 'react';
import { shallow } from 'enzyme';
import { HookApp } from '../HookApp';


describe('Pruebas al componente <HookApp />', () => {
    let wrapper = shallow(<HookApp />)

    beforeEach(() => {
        wrapper = shallow(<HookApp />)
    })

    test('Debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
```

## Pruebas sobre useCounter - CustomHook

Vamos a crear un test para evaluar que se este retornando lo que deseamos del customHook, es decir un contador con un valor de 10, y 3 elementos de tipo función:

```js
describe('Pruebas al customHook useCounter', () => {
    test('Debe de retornar valores por defecto', () => {
        const { result } = renderHook(() => useCounter())

        expect(result.current.state).toBe(10)
        expect(typeof result.current.increment).toBe('function')
        expect(typeof result.current.decrement).toBe('function')
        expect(typeof result.current.reset).toBe('function')
    })
})
```

También podemos probar que el contador inicie desde el punto pedido:

```js
describe('Pruebas al customHook useCounter', () => {
    ...
    test('Debe de tener el counter en 100', () => {
        const { result } = renderHook(() => useCounter(100))

        expect(result.current.state).toBe(100)
    })
})
```

## Ejecutar funciones del customHook dentro de las pruebas

Para ejecutar una función de un customHook, necesitamos importar `act` de la misma librería de `renderHook`. Luego, en el lugar donde hacemos el test de la función, traemos la renderización del hook, extraemos la función, por medio de `act` la ejecutamos, luego podemos obtener el estado actualizado y lo comparamos:

```js
import { renderHook, act } from '@testing-library/react-hooks'


describe('Pruebas al customHook useCounter', () => {
    ...
    test('Debe de incrementar el counter en 1', () => {
        const { result } = renderHook(() => useCounter())

        const { increment } = result.current
        act(() => {increment()})

        const { state } = result.current
        expect(state).toBe(11)
    })
})
```

También podemos pasar parámetros a las funciones en caso de necesitarlas o de quererlas usar:

```js
describe('Pruebas al customHook useCounter', () => {
    ...
    test('Debe de decrementar el counter en 10 y dar como resultado 90', () => {
        const { result } = renderHook(() => useCounter(100))

        const { decrement } = result.current
        act(() => { decrement(10) })

        const { state } = result.current
        expect(state).toBe(90)
    })
})
```

## Pruebas sobre useForm - CustomHook

El primer test que le haremos a este customHook, es que regrese por defecto el formulario que le pasamos por parámetro, junto a las 2 funciones que retorna el hook:

```js
describe('Purebas al customHook useForm', () => {
    const initialForm = {
        name: 'Ferrer',
        email: 'test@mail.com'
    }

    test('Debe regresar un formulario por defecto', () => {
        const { result } = renderHook(() => useForm(initialForm))

        const [values, handleInputChange, reset] = result.current

        expect(values).toEqual(initialForm)
        expect(typeof handleInputChange).toBe('function')
        expect(typeof reset).toBe('function')
    })
}
```

El segundo test, consiste en poder cambiar el valor del campo del nombre dentro del formulario:

```js
describe('Purebas al customHook useForm', () => {
    ...
    test('Debe cambiar 1 campo del formulario (name)', () => {
        const { result } = renderHook(() => useForm(initialForm))
        const [, handleInputChange,] = result.current

        act(() => {
            handleInputChange({ target: { name: 'name', value: 'new' } })
        })

        const [values] = result.current
        expect(values).toEqual({ ...initialForm, name: 'new' })
    })
}
```

El siguiente test consiste en que luego de cambiar un campo, si queremos resetear el formulario, se haga exitosamente:

```js
describe('Purebas al customHook useForm', () => {
    ...
    test('Debe re-establecer el formulario con Reset', () => {
        const { result } = renderHook(() => useForm(initialForm))
        const [, handleInputChange, reset] = result.current

        act(() => {
            handleInputChange({ target: { name: 'name', value: 'new' } })
            reset()
        })

        const [values] = result.current
        expect(values).toBe(initialForm)
    })
})
```

## Pruebas sobre useFetch - CustomHook

La primera prueba que le vamos a hacer al componente es verificar la respuesta por defecto del hook:

```js
describe('Pruebas al customHook useFetch', () => {
    test('Debe traer la información por defecto', () => {
        const { result } = renderHook(() => useFetch('https://www.breakingbadapi.com/api/quotes/1'))

        const { data, loading, error } = result.current
        
        expect(data).toBe(null)
        expect(loading).toBe(true)
        expect(error).toBe(null)
    })
})
```

La segunda prueba consiste en hacer la petición y esperar una respuesta, además de que ya no debe decir que está cargando, y no debe mostrar error:

```js
describe('Pruebas al customHook useFetch', () => {
    ...
    test('Debe de tener la info deseada', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useFetch('https://www.breakingbadapi.com/api/quotes/1'))
        await waitForNextUpdate()

        const { data, loading, error } = result.current

        expect(data.length).toBe(1)
        expect(loading).toBe(false)
        expect(error).toBe(null)
    })
})
```

Un tercer test puede ser para probar una url con error y mostrar el mensaje de error por parte del hook:

```js
describe('Pruebas al customHook useFetch', () => {
    ...
    test('Debe de manejar el error', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useFetch('https://reqres.in/apid/users?page=2'))
        await waitForNextUpdate({ timeout: 5000 })

        const { data, loading, error } = result.current

        expect(data).toBe(null)
        expect(loading).toBe(false)
        expect(error).toBe('No se pudo cargar la data')
        expect(error).not.toBe(null)
    })
})
```

## Pruebas con múltiples hooks simultáneos

Creamos un snapshot para el componente `<MultipleCustomHook />`:

```jsx
describe('Pruebas al componente <Multiple Custom Hook />', () => {
    test('Debe', () => {
        const wrapper = shallow(<MultipleCustomHooks />)

        expect(wrapper).toMatchSnapshot()
    })
})
```

Ahora, para poder usar el hook useFetch y simular que ya tenemos data, debemos usar `jest.mock`. En ese caso, necesitamos definir el estado inicial de la respuesta en el primer test, y una respuesta falsa en el segundo test:

```jsx
import { useFetch } from '../../../hooks';

jest.mock('../../../hooks/useFetch')


describe('Pruebas al componente <Multiple Custom Hook />', () => {
    
    test('Debe de mostrarse correctamente', () => {
        useFetch.mockReturnValue({
            data: null,
            loading: true,
            error: null
        })
        ...
    })
    ...
}
```

En el segundo test simulamos una respuesta positiva, y comprobamos si se está mostrando la información de manera correcta.

```jsx
jest.mock('../../../hooks/useFetch')

describe('Pruebas al componente <Multiple Custom Hook />', () => {
    ...
    test('Debe de mostrar la información', () => {
        useFetch.mockReturnValue({
            data: [{
                author: 'Ferrer',
                quote: 'Hola mundo'
            }],
            loading: false,
            error: null
        })

        const wrapper = shallow(<MultipleCustomHooks />)

        expect(wrapper.find('.alert').exists()).toBe(false)
        expect(wrapper.find('.mb-2').text().trim()).toBe('Hola mundo')
        expect(wrapper.find('footer').text().trim()).toBe('Ferrer')
    })
})
```

Ahora vamos a usar en conjunto el hook de `useCounter`. Primero creamos el mock, y luego antes de cada prueba establecemos las propiedades del hook:

```jsx
import { useFetch, useCounter } from '../../../hooks';

...
jest.mock('../../../hooks/useCounter')


describe('Pruebas al componente <Multiple Custom Hook />', () => {
    beforeEach(() => {
        useCounter.mockReturnValue({
            state: 10,
            increment: jest.fn(),
            decrement: jest.fn(),
            reset: jest.fn()
        })
    })
    ...
})
```

## Tarea - Interacciones con el useState

Vamos a entrar en modo de pruebas con el componente `<RealExampleRef />`. El primer test será tomar un snapshot.

```jsx
import React from 'react';
import { shallow } from 'enzyme'
import { RealExampleRef } from '../../../components/04-useRef';


describe('Pruebas al componente <RealExampleRef />', () => {
    let wrapper
    
    beforeEach(() => {
        wrapper = shallow(<RealExampleRef />)
    })

    test('Debe mostrarse correctamenre', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
```

El segundo test consiste en saber si se está mostrando el componente `<MultipleCustomHooks />` luego de presionar el botón para ocultarlo o mostrarlo:

```jsx
describe('Pruebas al componente <RealExampleRef />', () => {
    ...
    test('Debe de mostrar el componente <MultipleCustomHooks />', () => {
        wrapper.find('button').simulate('click')
        
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('MultipleCustomHooks').exists()).toBe(true)
    })
})
```

## Pruebas sobre el reducer

Vamos a probar la función `todoReducer` que se encuentra en el archivo del mismo nombre. Lo primero que vamos a hacer es crear un arreglo con algunos todos falsos dentro de un archivo llamado `tests/fixtures/demoTodos.js`:

```js
export const demoTodos = [
    { id: 1, desc: 'Aprender Testing en React', done: false },
    { id: 2, desc: 'Aprender React', done: false },
]
```

El primer test consiste en retorar el estado por defecto, puesto que no se la pasa ninguna acción al reducer:

```js
describe('Pruebas a la función todoReducer', () => {
    test('Debe de retornar el estado por defecto', () => {
        const state = todoReducer(demoTodos, {})

        expect(state).toEqual(demoTodos)
    })
})
```

El segundo test consiste en comprobar que se esta agregando el nuevo todo que se envía tomando en cuenta el estado y el action:

```js
describe('Pruebas a la función todoReducer', () => {
    ...
    test('Debe de agregar un TODO', () => {
        const payload = {
            id: 3,
            desc: 'Nuevo TODO',
            done: true
        }

        const state = todoReducer(demoTodos, { type: 'add', payload })

        expect(state).toEqual([...demoTodos, payload])
        expect(state.length).toBe(3)
    })
})
```

## Pruebas restantes de mi reducer

Otro test para hacer, es eliminar un todo mediante el reducer:

```js
describe('Pruebas a la función todoReducer', () => {
    ...
    test('Debe de eliminar un TODO por su id (agregado en el anterior test)', () => {
        const state = todoReducer(demoTodos, { type: 'delete', payload: 3 })
        expect(state.length).toBe(2)
        expect(state).toEqual(demoTodos)
    })
})
```

La última acción será cambiar el done de uno de los TODOS, y que el siguiente elemento no presente ningun cambio:

```js
describe('Pruebas a la función todoReducer', () => {
    ...
    test('Debe de hacer el Toggle del TODO', () => {
        const state = todoReducer(demoTodos, { type: 'toggle', payload: 1 })
        expect(state[0].done).toBe(true)
        expect(state[1]).toEqual(demoTodos[1])
    })
})
```

## Pruebas en el componente TodoListItem

Vamos al probar el componente `<TodoListItem />` que es el segundo con menor complejidad en la carpeta `08-useReducer`. El primer test consiste en tomarle un snapshot, pero teniendo en cuenta que pasamos props al componente:

```jsx
TodoListItem.propTypes = {
    i: PropTypes.number.isRequired,
    todo: PropTypes.object.isRequired,
    handleToggle: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
}
```

Por lo tanto nuesto primer test quedara de la siguiente manera:

```jsx
import React from 'react';
import { shallow } from 'enzyme'
import { TodoListItem } from '../../../components/08-useReducer';
import { demoTodos } from '../../fixtures/demoTodos';


describe('Probar el componente <TodoListItem />', () => {
    let wrapper

    const handleToggle = jest.fn()
    const handleDelete = jest.fn()

    beforeEach(() => {
        wrapper = shallow(
            <TodoListItem i={1} todo={demoTodos[1]} handleToggle={handleToggle} handleDelete={handleDelete} />
        )
    })

    test('Debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
```

El siguiente test consiste en que si se llame la función para borrar un Todo 1 sola vez, y que además tenga un argumento:

```jsx
describe('Probar el componente <TodoListItem />', () => {
    ...
    test('Debe de llamar la función borrar', () => {
        wrapper.find('button').simulate('click')
        expect(handleDelete).toHaveBeenCalled()
        expect(handleDelete).toHaveBeenCalledTimes(1)
        expect(handleDelete).toHaveBeenCalledWith(expect.any(Number))
        expect(handleDelete).toHaveBeenCalledWith(demoTodos[1].id)
    })
})
```

Otro test es comprobar que que se renderize correctamente la descripción del todo dentro del componente:

```jsx
describe('Probar el componente <TodoListItem />', () => {
    const i = 1
    ...
    test('Debe de mostrar el texto correctamente', () => {
        expect(wrapper.find('p').text().trim()).toBe(`${i + 1}. ${demoTodos[1].desc}`)
    })
})
```

Una última prueba es comprobar que el parrafo del todo tenga una clase determina dependiendo si se ha completado o no:

```jsx
describe('Probar el componente <TodoListItem />', () => {
    ...
    test('Debe de tener la clase complete si el TODO.done == true', () => {
        const todo = demoTodos[0]
        todo.done = true
        wrapper = shallow(
            <TodoListItem i={1} todo={todo} handleToggle={handleToggle} handleDelete={handleDelete} />
        )

        expect(wrapper.find('p').hasClass('complete')).toBe(true)
    })
})
```

## Pruebas en el TodoList

Primero le tomamos un snapshot al componente, teniendo en cuenta los props que solicita:

```jsx
describe('Pruebas al componente <TodoList />', () => {
    let wrapper

    const handleToggle = jest.fn()
    const handleDelete = jest.fn()

    beforeEach(() => {
        wrapper = shallow(<TodoList todos={demoTodos} handleToggle={handleToggle} handleDelete={handleDelete} />)
    })

    test('Debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
```

Luego creamos un test para saber si la cantidad de componentes `<TodoListItem />` es igual al tamaño del arreglo de todos. Además se comprueba que se esten pasando las props a los componente hijos:

```jsx
describe('Pruebas al componente <TodoList />', () => {
    ...
    test('Debe de tener n <TodoListItem />', () => {
        expect(wrapper.find('TodoListItem').length).toBe(demoTodos.length)
        expect(wrapper.find('TodoListItem').at(0).prop('handleDelete')).toEqual(expect.any(Function))
    })
})
```

## Pruebas con el TodoAdd

Vamos a crear un snapshot para el componente `<TodoAdd />`:

```jsx
describe('Pruebas al componente <TodoAdd />', () => {
    let wrapper

    const handleAddTodo = jest.fn()

    beforeEach(() => {
        wrapper = shallow(<TodoAdd handleAddTodo={handleAddTodo} />)
    })

    test('Debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })
    ...
})
```

Debemos evaluar que si presionamos el botón de enviar el formulario sin ingresar data, no se active la función de añadir un nuedo todo:

```jsx
describe('Pruebas al componente <TodoAdd />', () => {
    ...
    test('NO debe llamar handleAddTodo', () => {
        const formSubmit = wrapper.find('form').prop('onSubmit')

        formSubmit({ preventDefault(){} })

        expect(handleAddTodo).not.toHaveBeenCalled()
        expect(handleAddTodo).toHaveBeenCalledTimes(0)
    })
})
```

Debemos probar que cuando ingresamos algo dentro de la caja de búsqueda se envíe correctamente y se llamé la función para añadir el todo. Tener en cuenta que el valor se debe añadir en la propiedad correcta del objeto a añadir, en este caso `desc`. Luego de enviar la tarea debemos comprobar que la función se envie con el parámetro especifico que estamos creando, pero como el id se está autogenerando con el tiempo, debemos ignorar su valor pero no el tipo. No importa la cantidad de expect que tengamos, podemos seguir añdiendo más, y en este caso necesitamos evaluar que si se limpie el input al finalizar el envío del formulario:

```js
describe('Pruebas al componente <TodoAdd />', () => {
    ...
    test('Debe de llamar la función handleAddTodo', () => {
        const value = 'Aprender Testing'
        wrapper.find('input').simulate('change', { target: { value, name: 'desc' } })

        const formSubmit = wrapper.find('form').prop('onSubmit')
        formSubmit({ preventDefault() { } })

        expect(handleAddTodo).toHaveBeenCalled()
        expect(handleAddTodo).toHaveBeenCalledTimes(1)
        expect(handleAddTodo).toHaveBeenCalledWith(expect.any(Object))
        expect(handleAddTodo).toHaveBeenCalledWith({
            id: expect.any(Number),
            desc: value,
            done: false
        })
        expect(wrapper.find('input').prop('value')).toBe('')
    })
})
```

## Pruebas en el TodoApp

Vamos a tomar un snapshot al componente:

```jsx
describe('Pruebas al componente <TodoApp />', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallow(<TodoApp />)
    })

    test('Debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
```

Luego vamos a hacer la prueba para agregar un TODO, y vamos a verificar que si se llame el localStorage, para ello necesitamos que el wrapper se monte y renderize con `mount` para obtener un acceso más grande a sus propiedades, luego configuramos el prototipo del Storage para tener una función vacia de jest que se pueda registrar en la prueba:

```jsx
import { shallow, mount } from 'enzyme'
import { act } from '@testing-library/react'


describe('Pruebas al componente <TodoApp />', () => {
    ...
    Storage.prototype.setItem = jest.fn(() => {})
    ...
    test('Debe de agregar un TODO', () => {
        const wrapper = mount(<TodoApp />)
        act(() => {
            wrapper.find('TodoAdd').prop('handleAddTodo')( demoTodos[0] )
            wrapper.find('TodoAdd').prop('handleAddTodo')( demoTodos[1] )
        })
        expect(wrapper.find('#todo-app-title').text().trim()).toBe('TodoApp ( 2 )')
        expect(localStorage.setItem).toHaveBeenCalledTimes(2)
    })
})
```

Podemos evaluar cuando se elimina un todo de la lista:

```jsx
describe('Pruebas al componente <TodoApp />', () => {
    ...
    test('Debe de eliminar un TODO', () => {
        wrapper.find('TodoAdd').prop('handleAddTodo')( demoTodos[0] )
        wrapper.find('TodoList').prop('handleDelete')( demoTodos[0].id )
        expect(wrapper.find('#todo-app-title').text().trim()).toBe('TodoApp ( 0 )')
    })
})
```

## Pruebas con useContext

Cuanto queremos hacer testing a un componente que tiene un contexto provisto, necesitamos hacer lo siguiente:

```jsx
describe('Pruebas en <HomeScreen />', () => {
    let wrapper

    const user = {
        name: 'test',
        email: 'mail'
    }
    const setUser = jest.fn()

    beforeEach(() => {
        wrapper = shallow(<UserContext.Provider value={{user, setUser}}>
            <HomeScreen />
        </UserContext.Provider>)
    })

    test('Debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
```

Cuando miramos el archivo del snapshot del componente, nos damos cuenta que la información no es muy amplia. Esto se debe a que estamos usaando `shallow` para renderizar el componente. Si queremos más información usamos la función `mount`:

```jsx
import { mount } from 'enzyme'


describe('Pruebas en <HomeScreen />', () => {
    ...
    beforeEach(() => {
        wrapper = mount(<UserContext.Provider value={{user, setUser}}>
            <HomeScreen />
        </UserContext.Provider>)
    })
    ...
})
```

## Pruebas de funciones del context

Vamos a tomar un snashot del componente `<LoginScreen />` teniendo en cuenta que se le debe proveer un contexto, pero solo va a usar la función:

```jsx
describe('Pruebas al componente <LoginScreen />', () => {
    let wrapper

    const setUser = jest.fn()

    beforeEach(() => {
        wrapper = mount(<UserContext.Provider value={{ setUser }}>
            <LoginScreen />
        </UserContext.Provider>)
    })

    test('Debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
```

Otro test es evaluar que podamos hacer login con el objeto especifico que está quemado en el componente:

```jsx
describe('Pruebas al componente <LoginScreen />', () => {
    ...
    test('Debe hacer login con los argumentos especificos', () => {
        wrapper.find('button').simulate('click');

        expect(setUser).toHaveBeenCalledTimes(1)
        expect(setUser).toHaveBeenCalledWith({
            id: 1234, 
            name: 'ferrer',
            email: 'test@mail.com'
        })
    })
})
```

## Pruebas generales en nuestro AppRouter

Vamos a tomarle un snapshot al componente `<AppRouter />`. Solo haremos dicho test, puesto que la mayoría del código es de parte de una librería de terceros:

```jsx
describe('Pruebas al componente <AppRouter />', () => {
    const user = {
        name: 'test',
        email: 'mail'
    }

    const wrapper = mount(<UserContext.Provider value={{ user }}>
        <AppRouter />
    </UserContext.Provider>)

    test('Debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
```
