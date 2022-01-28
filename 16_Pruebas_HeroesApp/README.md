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
