# Sección 16: Pruebas de nuestra aplicación de Héroes

- Nuevos tipos de pruebas
- Pruebas en rutas privadas y públicas
- MemoryRouter
- Pruebas en nuestro DashboardRouter
- Pruebas en el AppRouter
- Simular URLs y segmentos
- Simular queryParams y queryStrings

Recuerden que el objetivo de las pruebas, es ir probando cosas nuevas cada vez y tener un repertorio completo de diferentes casos.

## Inicio de la sección - Pruebas en HéroesApp

Vamos a usar el proyecto de la secciones anteriores para poder hacer las pruebas sobre el mismo. Instalamos los node_modules con el comando `npm i`, también instalamos las librerías de enzyme y enzyme-to-json con el comando `npm install --save-dev @wojtekmaj/enzyme-adapter-react-17 enzyme-to-json`. Dentro del archivo `setupTest.js` hacemos la siguiente configuración:

```js
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

import { createSerializer } from 'enzyme-to-json'


Enzyme.configure({ adapter: new Adapter() })
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }))
```

## Pruebas al authReducer

El primer test que vamos a hacer será al `authReducer` para poder probar sus estados y tipos. Necesitamos evaluar que se retorne el estado actual en caso de que no se envíe ninguna acción, que podamos cambiar la información cuando el tipo de la acción sea de login, y por último, que se pueda evidenciar el cambio de la información cuando hacemos logout:

```js
describe('Test to reducer authReducer', () => {

    const logoutState = { logged: false }
    const userState = {
        logged: true,
        name: 'Test'
    }

    it('Should return the default state', () => {
        const state = authReducer(logoutState, {})
        expect(state).toEqual({ logged: false })
    })

    test('Should authenticate and put the username', () => {
        const action = {
            type: types.login,
            payload: { name: 'Test' }
        }
        const newState = authReducer(logoutState, action)
        expect(newState).toEqual(userState)
    })

    it('Should delete the username and logged in false', () => {
        const action = {
            type: types.logout
        }
        const newState = authReducer(userState, action)
        expect(newState).toEqual(logoutState)
    })
})
```

## Pruebas al AppRouter

Necesitamos hacer la prueba de que si el usuario no está autenticado, se muestre la pantalla del componente `<LoginScreen />`. Para ello requerimos renderizar el componente mediante la función `mount` de enzyme. También necesitamos definir un contexto a proveer dentro del higher-order component (HOC) `<AuthContext />`, el cual atrapa al componente `<AppRouter />`:

```jsx
import { mount } from 'enzyme'
import { AuthContext } from '../../../auth'
import { AppRouter } from '../../../components/routers'

describe('Test to <AppRouter /> component', () => {

    test('Should show login path if user is not authenticated', () => {
        const contextValue = {
            user: {
                logged: false
            }
        }
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        )
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('h1').text().trim()).toBe('Login Screen')
    })
})
```

## Pruebas AppRouter - Usuario Autenticado

Aplicamos un nuevo test para saber si el usuario está autenticado. En tal caso, se debe mostrar la zona privada, en la cual tenemos nosotros el navbar, si se encuentra dicho componente, entonces el usuario hizo login con exito:

```jsx
describe('Test to <AppRouter /> component', () => {
    ...
    test('Should <Marvel /> component if user is authenticated', () => {
        const contextValue = {
            user: {
                name: 'Test',
                logged: true
            }
        }
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        )
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('.navbar').exists()).toBeTruthy()
    })
})
```

## Pruebas en el DashboardRoutes

Cuando hacemos las pruebas para este componente, debemos tener claro que es un componente que aparece cuando el usuario está autenticado según lo que se encuentra en el contexto, por tal motivo creamos un contexto con un usuario logeado. Como dentro del componente estamos usando algunos hooks de react-router-dom, necesitamos usar un HOC que nos provee la misma librería llamado `<MemoryRouter />` para tener acceso a los elementos relacionados con la navegación. Con dicho componente debemos atrapar al componente `<DashboardComponent />` en cada renderización de los test:

```jsx
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../../auth'
import { DashboardRoutes } from '../../../components/routers'


describe('Test to <DashboardRoutes /> component', () => {
    const contextValue = {
        user: {
            logged: true,
            name: 'Test'
        }
    }

    test('Should match with Snapshot', () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        )
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('.text-info').text().trim()).toBe('Test')
    })
})
```

Con el test anterior solo tenemos la renderización de la ruta inicial `/`, debemos testear las demás rutas.

## Probar rutas dentro del DashboardRoutes

La manera en que nosotros podemos indicar en que ruta nos debemos ubicar en un componente que renderiza diversos componentes de tipo `<Route />`, es añadiendo la propiedad `initialEntries` dentro del componente `<MemoryRouter />`, en la cual apuntamos a un path en especifico:

```jsx
describe('Test to <DashboardRoutes /> component', () => {
    ...
    test('Should match with Snapshot in DC path', () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/dc']}>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        )
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('h1').text().trim()).toBe('DC Screen')
    })
})
```

## Pruebas en el SearchScreen

El primer test que le haremos al componente es hacer match con el snapshot del componente. Recordar que dentro del componente `<SearchScreen />` estamos usando `useNavigate` y también esta bajo un contexto, por lo que necesitamos atrapar el componente dentro del HOC `<MemoryRouter />` de react-router-dom apuntando a la ruta de `/search`, y este a su vez ser hijo del `<AuthContext />`:

```jsx
import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { SearchScreen } from '../../../components/search'
import { AuthContext } from '../../../auth'


describe('Test to <SearchScreen /> component', () => {
    const contextValue = {
        user: {
            logged: true,
            name: 'Test'
        }
    }

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter initialEntries={['/search']}>
                <SearchScreen />
            </MemoryRouter>
        </AuthContext.Provider>
    )


    test('Should match with Snapshot', () => {
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('.alert-info').text().trim()).toBe('Search a Hero')
    })
})
```

## Pruebas con los query params

Vamos a crear un test para saber si al hacer la búsqueda de un héroe aparece una tarjeta con el mismo, y que además el input cambie su valor por el ingresado dentro de los query params de la ruta pasada dentro de la propiedad `intialEntries` del componente `<MemoryRouter />`:

```jsx
describe('Test to <SearchScreen /> component', () => {
    ...
    test('Should show a Batman card and the input with the queryString value', () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <SearchScreen />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('input').prop('value')).toBe('batman')
        expect(wrapper.find('img').prop('alt')).toBe('Batman')
    })
})
```

Otra prueba que podemos hacer es cuando se ingresa un elemento que nos encuentra dentro de los datos, algo que no podemos mostrar:

```jsx
describe('Test to <SearchScreen /> component', () => {
    ...
    test('Should show an error if it does not find a hero', () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/search?q=One%20Punch']}>
                    <SearchScreen />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('input').prop('value')).toBe('One Punch')
        expect(wrapper.find('.alert-info').text().trim()).toBe('No Matches by One Punch')
    })
})
```

## Mock de funciones y requireActual

Necesitamos hacer la prueba de que cuando ingresamos un valor a consultar y presionamos el botón de buscar, entonces podamos ver el ingreso de los query params. Lo primero que vamos a hacer es tener renderizado el componente dentro de una ruta relacionada con `/search`:

```jsx
describe('Test to <SearchScreen /> component', () => {
    ...
    test('Should call `navigate` to the new screen', () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/search']}>
                    <SearchScreen />
                </MemoryRouter>
            </AuthContext.Provider>
        )
    })
})
```

Luego simulamos el cambio del valor del input y el envío de la búsqueda:

```jsx
describe('Test to <SearchScreen /> component', () => {
    ...
    test('Should call `navigate` to the new screen', () => {
        ...
        wrapper.find('input').simulate('change', { target: { name: 'searchText', value: 'Spider' } })
        wrapper.find('form').prop('onSubmit')({ preventDefault: () => {} })
    })
})
```

Cuando hacemos el test anterior se genera un error. Nos informa de que estamos actualizando algo dentro del componente `<MemoryRouter />` pero sin estar atrapado dentro de un `act(...)`. Esto se debe a que la función `handleSubmit()` dentro del componente `<SearchScreen />` esta usando el método que se genera del hook `useNavigate` de react-router-dom, lo que envía cierto procedimiento que debe ser esperado por React para renderizarlo. Nosotros no queremos probar que el navigate haga el cambio en el URL, puesto que esa funcionalidad ya fue probada por la libéria que lo creo, lo que queremos es saber si se llamo la función con el argumento de la búsqueda.

Lo que vamos a hacer es crear un mock sobre reac-router-dom, pero solo vamos a fingir el hook de `useNavigate`, por lo que dentro del mock retornamos un callback con un objeto que contiene todas las funciones de la librería react-router-dom usando la función `requireActual`, pero modificando el hook antes mencionado, el cual ahora va a llamar a una función simulada que debe tener obligatoriamente el prefijo `mock`.

```jsx
const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}))
```

Teniendo listo el mock, podemos hacer que es test espere que la función `mockNavigate` sea llamada con el argumento de la búsqueda.

```jsx
describe('Test to <SearchScreen /> component', () => {
    ...
    test('Should call `navigate` to the new screen', () => {
        ...
        expect(mockNavigate).toHaveBeenCalledWith('?q=Spider')
    })
})
```

## Tarea - Pruebas en el Navbar

Necesitamos hacer un test que haga match con el Snapshot de componente `<Navbar />` cuando el usuario está dentro de la zona privada. Otro test para cuando se hace el logout, lo que implica que se simule el click sobre el botón, el cual a su vez hace el dispatch de una acción, y luego se hace una navegación a otra ruta.

## Solución - Pruebas en el Navbar

Primero, hacer match con el snapshot:

```jsx
describe('Test to <Navbar /> component', () => {
    const contextValue = {
        user: {
            logged: true,
            name: 'Test'
        }
    }

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter initialEntries={['/']}>
                <Navbar />
            </MemoryRouter>
        </AuthContext.Provider>
    )


    test('Should match with Snapshot', () => {
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('.text-info').text().trim()).toBe('Test')
    })
})
```

Segundo. Simular el logout y esperar que se haya llamado el dispatch y el navigate:

```jsx
const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}))


describe('Test to <Navbar /> component', () => {
    const dispatch =jest.fn()

    const contextValue = {
        user: {
            logged: true,
            name: 'Test'
        },
        dispatch
    }
    ...
    test('Should call: logout, navigate and dispatch with args', () => {
        wrapper.find('button').simulate('click', { preventDefault(){} })

        const action = { type: types.logout }

        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(dispatch).toHaveBeenCalledWith(action)
        expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true })
    })
})
```

## Pruebas en el LoginComponent

Vamos a crear un test para poder hacer match con el snapshot del componente `<LoginScreen />`:

```jsx
describe('Test to <LoginScreen /> component', () => {
    const dispatch = jest.fn()

    const contextValue = {
        user: { logged: false },
        dispatch
    }

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter initialState={['/login']}>
                <LoginScreen />
            </MemoryRouter>
        </AuthContext.Provider>
    )

    test('Should match with Snapshot', () => {
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('h1').text().trim()).toBe('Login Screen')
    })
})
```

Luego creamos un test para comprobar la funcionalidad del botón de login, tomando en cuenta la acción que se debe disparar con el dispatch del context, luego validar el reemplazo de la ruta, y también prestando atención a que si dentro del localStorage ya hay alguna últma ruta, nos debemos dirigir a la misma:

```jsx
const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}))


describe('Test to <LoginScreen /> component', () => {
    ...
    test('Should call login, dispatch, localStorage, navigate', () => {
        const handleClick = wrapper.find('button').prop('onClick')
        handleClick()

        const action = {
            type: types.login,
            payload: {
                name: 'David Ferrer'
            }
        }
        expect(dispatch).toHaveBeenCalledWith(action)
        expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true })
        
        localStorage.setItem('lastPath', '/search?q=Batman')
        handleClick()
        expect(mockNavigate).toHaveBeenCalledWith('/search?q=Batman', { replace: true })
    })
})
```

## Pruebas en el HeroScreen

Para este componente necesitamos testear que si no hay ningun parámetro en la URL para traer un héroe, entonces se muestre un mensaje pequeño, pero que no renderice ninguna tarjeta o información:

```jsx
const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}))


describe('Test to <HeroScreen /> component', () => {
    test('Should not display the component without a hero', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path='/hero' element={<HeroScreen />} />
                    <Route path='/' element={<h1>No Hero Page</h1>} />
                </Routes>
            </MemoryRouter>
        )

        expect(wrapper.find('h1').text().trim()).toBe('No Hero Page')
    })
})
```

Otro test consiste en que teniendo un argumento y si sel héroe existe, entonces se muestre la información:

```jsx
describe('Test to <HeroScreen /> component', () => {
    ...
    test('Should display the component if there is a parameter and the hero exists', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/dc-batman']}>
                <Routes>
                    <Route path='/hero/:idHero' element={<HeroScreen />} />
                    <Route path='/' element={<h1>No Hero Page</h1>} />
                </Routes>
            </MemoryRouter>
        )

        expect(wrapper.find('.row').exists()).toBe(true)
        expect(wrapper.find('h3').text().trim()).toBe('Batman')
    })
})
```

## Pruebas adicionales en el HeroScreen

Debemos validar que al presionar el botón de regresar, volvamos atras en el historial:

```jsx
describe('Test to <HeroScreen /> component', () => {
    ...
    test('Should return to the previous page', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/dc-batman']}>
                <Routes>
                    <Route path='/hero/:idHero' element={<HeroScreen />} />
                </Routes>
            </MemoryRouter>
        )

        wrapper.find('button').prop('onClick')()
        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })
})
```

También debemos validar el caso en que se ingrese un héroe que no existe:

```jsx
describe('Test to <HeroScreen /> component', () => {
    ...
    test('Should display the No Hero Page if not there a hero', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/one-punch']}>
                <Routes>
                    <Route path='/hero/:idHero' element={<HeroScreen />} />
                    <Route path='/' element={<h1>No Hero Page</h1>} />
                </Routes>
            </MemoryRouter>
        )

        expect(wrapper.find('h1').text().trim()).toBe('No Hero Page')
    })
})
```

## Pruebas en el PrivateRoute

Vamos a comprobar que si el usuario esta logeado, entonces se muestre los hijos de componente `<PrivateRoute />` y se guarde la última ruta dentro del localStorage, para este último creamos un mock con el fin de poder tener información de cuando se llama y con que argumentos:

```jsx
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../../auth'
import { PrivateRoute } from '../../../components/routers'


describe('Test to <PrivateRoute /> component', () => {
    Storage.prototype.setItem = jest.fn()

    test('Should display the component if the user is authenticated and save in the localStorage', () => {
        const contextValue = {
            user: {
                logged: true,
                name: 'Test'
            }
        }
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute>
                        <h1>Private Component</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(wrapper.text().trim()).toBe('Private Component')
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/')
    })
})
```

Ahora necesitamos evaluar que si el usuario no está autenticado, entonces no pueda ingresar a los hijos del componente. Es importante tener en cuenta que dentro del componente `<PrivateRoute />` se está haciendo uso del componente `<Navigate />` de react-router-dom, por lo que necesitamos hacer un mock del mismo.

Un componente es una función que regresa jsx, por lo que crear el mock del `<Navigate />` es sencillo:

```jsx
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Navigate: () => <span>Exit</span>
}))
```

Ahora si podemos hacer el test y comprobar que se muestre el mensaje de `Exit` que declaramos dentro del mock:

```jsx
describe('Test to <PrivateRoute /> component', () => {
    ...
    test('Should block the component if the user is not authenticated', () => {
        const contextValue = { user: { logged: false } }

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute>
                        <h1>Private Component</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(wrapper.text().trim()).toBe('Exit')
    })
})
```
