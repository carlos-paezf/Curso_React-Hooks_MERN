# Sección 8: Testing - Probando la aplicación de GifExpert

- Seguir el camino de las pruebas
- Pruebas en componentes específicos
- Pruebas en componentes de forma individual
- Pruebas con customHooks
- Esperar cambios en un customHook
- Simular eventos en inputs y formularios
- Simular llamadas a funciones
- Evaluar si existen elementos en el componente

En esta sección seguiremos expandiendo todo lo que habíamos visto anteriormente en otras secciones de pruebas, pero ahora veremos más a detalle los temas y adicionalmente introduciremos nuevos conceptos y nuevos tipos de pruebas.

## Configurar el ambiente de pruebas

Vamos a usar el proyecto de la [Sección 6](../6_GifExpertApp_Aplicacion). Para instalar los node_modules usamos el comando `npm i`. Para levantar el proyecto usamos el comando `npm start` o `yarn start`.

Vamos a usar Enzyme y Enzyme-to-Json, por lo que empleamos el comando `npm install --save-dev @wojtekmaj/enzyme-adapter-react-17` y `npm install --save-dev enzyme-to-json`. Configuramos ambos paquetes dentro de `setupTests.js` de la siguiente manera:

```js
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

import { createSerializer } from 'enzyme-to-json'


Enzyme.configure({ adapter: new Adapter() })
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }))
```

La primera prueba que vamos a hacer será con el componente `<GifGridItem />`. El primer test consistirá en tomar un snapshot y hacer match con el mismo para saber si se muestra el contenido correctamente. Vamos a crear un archivo llamado `src/tests/components/GifGridItem.test.jsx` y haremos el primer test:

```jsx
import { shallow } from 'enzyme'
import { GifGridItem } from '../../components';


describe('Pruebas en <GifGridItem />', () => {
    test('Debe mostrarse correctamente', () => {
        const wrapper = shallow(<GifGridItem />)
        expect(wrapper).toMatchSnapshot()
    });
});
```

Para correr los test del proyecto usamos el comando `npm test` o `yarn test`. Dentro de las opciones de los test, podemos elegir el archivo mediante un patrón que coincida con el nombre del mismo.

## Implementando PropTypes y Actualizar Snapshots

Recordemos que el componente `<GifGridItem />` solicita 2 props que le debemos pasar. Lo ideal es que dichos props sean obligatorios, por lo que añadimos los propTypes dentro del componente:

```jsx
import PropTypes from 'prop-types'

export const GifGridItem = ({ title, url }) => { ... }

GifGridItem.propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
}
```

Dentro de nuestras pruebas creamos 2 constantes que vamos a enviarle mediante los props:

```jsx
describe('Pruebas en <GifGridItem />', () => {
    const title = 'Gif para los test'
    const url = 'http://localhost:1234/img.gif'

    test('Debe mostrarse correctamente', () => {
        const wrapper = shallow(<GifGridItem title={title} url={url} />)
        expect(wrapper).toMatchSnapshot()
    });
});
```

Ahora debemos actualizar el snapshot que teníamos, por lo que dentro de la consola donde están corriendo los test, presionamos `u` para actualizar el snapshot que nos muestra error.

## Pruebas del componente - GifGridItem

Podemos hacer diversas pruebas a nuestro componente. Por ejemplo, probar que el párrafo de la tarjeta contenga el título que se paso por props.

```jsx
describe('Pruebas en <GifGridItem />', () => {
    const title = 'Gif para los test'
    const url = 'http://localhost:1234/img.gif'

    const wrapper = shallow(<GifGridItem title={title} url={url} />)
    ...
    test('Debe de tener un párrafo con el título', () => {
        const p = wrapper.find('p')
        expect(p.text().trim()).toBe(title)
    });
})
```

Podemos evaluar que la imagen tenga la propiedad del src igual a la url que se recibe, y que también el alt de la misma sea igual al título entregado:

```jsx
describe('Pruebas en <GifGridItem />', () => {
    const title = 'Gif para los test'
    const url = 'http://localhost:1234/img.gif'

    const wrapper = shallow(<GifGridItem title={title} url={url} />)
    ...
    test('Debe de tener una imagen igual al url y alt de los props', () => {
        const img = wrapper.find('img')
        expect(img.props().src).toBe(url)
        expect(img.props().alt).toBe(title)
    });
})
```

Otra prueba que podemos hacer, es comprobar si un elemento tiene una clase de CSS especifica:

```jsx
describe('Pruebas en <GifGridItem />', () => {
    const title = 'Gif para los test'
    const url = 'http://localhost:1234/img.gif'

    const wrapper = shallow(<GifGridItem title={title} url={url} />)
    ...
    test('Debe de tener la clase animate__fadeIn', () => {
        const div = wrapper.find('div')
        expect(div.props().className.includes('animate__fadeIn')).toBe(true)
    })
})
```

## Pruebas en el helper getGifs

Vamos a testear nuestro helper. La primera prueba será que traiga 10 elementos cuando se le pasa una categoría, y el segundo test se encarga de verificar que no muestre nada en caso de que se envié un parámetro vacio:

```js
import { getGifs } from "../../helpers";

describe('Pruebas en el helper getGifs', () => {
    test('Debe traer 10 elementos', async () => {
        const data = await getGifs('react')
        expect(data.length).toBe(10)
    });

    test('Debe traer 0 resultados en caso de tener parámetro vacío', async () => {
        const data = await getGifs('')
        expect(data.length).toBe(0)
    })
});
```

## Pruebas del componente - AddCategory

El componente `<AddCategory />` es un componente con más dificultad en cuanto a test. Lo primero que vamos a hacer es crear un snapshot del mismo. Es importante recordar que dicho componente necesita que se le pase una función para el prop `setCategories`, razón por la cual creamos una función vacía:

```jsx
import React from 'react';
import { shallow } from 'enzyme'
import { AddCategory } from '../../components'


describe('Pruebas en el componente <AddCategory />', () => {
    const setCategories = () => { }

    const wrapper = shallow(<AddCategory setCategories={setCategories} />)

    test('Debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    });
});
```

## Simular cambios en un input

En el componente `<AddCategory />` tenemos un elemento input, el cual debe recibir un valor y tener la capacidad de que por medio del `onChange` se mute el estado de la variable que guarda el valor de entrada. Lo que vamos a hacer es primero crear un párrafo que nos permita observar el valor de la variable `inputValue`.

```jsx
export const AddCategory = ({ setCategories }) => {
    ...
    return (
        <>
            ...
            <p>{inputValue}</p>
        </>
    )
}
```

Luego en las pruebas, actualizamos el snapshot ya que fue un cambio premeditado, y creamos un nuevo test en el cual simulamos el evento change del input, pasando como argumentos del evento el `target.value`. Para comprobar que si se cambio de manera exitosa, podemos comparar el párrafo que renderiza el inputValue vs el value que le ingresamos mediante la prueba:

```jsx
describe('Pruebas en el componente <AddCategory />', () => {
    ...
    test('Debe de cambiar la caja de texto', () => {
        const input = wrapper.find('input')
        const value = 'Hola mundo'
        input.simulate('change', { target: { value } })

        expect(wrapper.find('p').text().trim()).toBe(value)
    })
});
```

## Simular un submit del formulario

Vamos a simular el caso en el que no ponemos nada en el input, y por lo tanto no se debe enviar el formulario. Lo primero que necesitamos el convertir el wrapper en una variable de tipo `let` para poder resetear su valor antes de cada prueba con `beforeEach()`. Además necesitamos convertir la función de `setCategories` en un elemento provisto por jest llamado `jest.fn()`:

```jsx
describe('Pruebas en el componente <AddCategory />', () => {
    const setCategories = jest.fn()

    let wrapper = shallow(<AddCategory setCategories={setCategories} />)

    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallow(<AddCategory setCategories={setCategories} />)
    })
    ...
});
```

Ahora si procedemos a crear el test. Es importante usar el método `beforeEach()` para poder limpiar todas las simulaciones y resetear el componente. El test consiste en simular el evento submit del formulario y como no le ingresamos nada, la función `setCategories` no se debe llamar.

```js
describe('Pruebas en el componente <AddCategory />', () => {
    ...
    test('NO debe de postear la información con submit', () => {
        const form = wrapper.find('form')
        form.simulate('submit', { preventDefault() { } })
        expect(setCategories).not.toHaveBeenCalled()
    })
});
```
