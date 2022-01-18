# Sección 5: Pruebas Unitarias y de Integración - Probando las secciones anteriores

- Introducción a las pruebas
- AAA
  - Arrange - Arreglar
  - Act - Actuar
  - Assert - Afirmar
- Primeras pruebas
- Jest
- Expect
- toBe
- Enzyme
- Comandos útiles en la terminal para pruebas
- Revisar elementos renderizados en el componente
- Simular eventos

## Introducción a las pruebas unitarias y de integración

Las pruebas o test no son una pérdida de tiempo, son muy necesarias pues nos permiten tener una aplicación segura. Las pruebas unitarias están enfocadas en pequeñas funcionalidades de la aplicación, mientras las pruebas de integración están enfocadas en cómo reaccionan varias piezas en conjunto.

Las pruebas deben ser fáciles de escribir y leer, además de ser confiables, rápidas y principalmente ser unitarias. Estos pasos son conocidos como ***AAA***:

- *Arrange*: Preparamos el estado inicial. Inicializamos variables, hacemos las importaciones necesarias.
- *Act*: Aplicamos acciones o estímulos al sujeto de prueba. Llamamos métodos, simulamos clicks, realizamos acciones sobre el paso anterior.
- *Assert*: Observar el comportamiento resultante. Son los resultados esperados, como por ejemplo: algo incremente, algo cambie o que nada suceda.

Las pruebas no hacen que la aplicación no tenga errores. Las pruebas pueden dar falsos positivos o falsos negativos. Las pruebas no llegan al bundle de producción, por lo que no hacen más lenta la aplicación, son locales. Si probamos todo, puede que el tiempo del desarrollo de los test llegue a ser el mismo o aún más que el tiempo de desarrollo de la aplicación, lo ideal el probar la ruta critica de la aplicación.

## Inicio de la sección - Pruebas sobre lo aprendido anteriormente

Vamos a usar los archivo de la [Sección 3](../3_Intro_JS/) para nuestras pruebas, pero con ayuda del proyecto de la sección anterior. Por practicidad, y para evitar errores, descargué los archivos de la clase, para seguir al pie de la letra el curso.

## Mi primera prueba

Vamos a crear un directorio especifico para las pruebas, y dentro del mismo creamos un archivo llamado `demo.test.js`. La manera para correr las pruebas es mediante el comando `npm run test` o `yarn test`. Las pruebas se ejecutan cada que se presenta un cambio en las mismas. A continuación presentamos una simple prueba:

```js
test('Debe ser TRUE', () => {
    // Arrange
    const isActive = true;                  
    
    // Act

    // Assert
    if (!isActive) {
        throw new Error('No está activo')
    }
})
```

## Jest - Expect - toBe

Si miramos la documentación de [Jest](https://jestjs.io/), nos vamos a encontrar con la Api Reference de `Expect`. Este elemento nos da la oportunidad de acceder a un cierto número de matches para poder validar diferentes cosas. Por ejemplo, necesitamos saber si el string 2 es igual al string 1:

```js
test('Los strings deben ser iguales', () => {
    //? 1. Inicialización
    const mensaje1 = 'Hola mundo'

    //? 2. Estimulo
    const mensaje2 = `Hola mundo!`

    //? 3. Observar el comportamiento
    expect(mensaje2).toBe(mensaje1)
})
```

Podemos agrupar las pruebas que queremos dentro de un solo conjunto con la función `describe`:

```js
describe('Prubeas en el archivo demo.test.js', () => {
    test('Los strings deben ser iguales', () => {
        ...
    })
})
```

## Pruebas en el archivo `02-template-string.js`

Dentro del directorio `test`, creamos un nuevo directorio llamado `base`, para poder seguir el orden de los archivo que se encuentran dentro de `src/base`. El primer archivo en probar será el archivo del titulo, y por lo tanto creamos un nuevo archivo dentro de `test/base` llamado `02-template-string.test.ts`.

Lo primero que vamos a hacer el descartas las líneas con `console.log` del archivo `02-template-string.js`, además de exportar la función que se encuentra en dicho archivo:

```js
export function getSaludo(nombre) {
    return 'Hola ' + nombre;
}
```

Dentro del archivo de pruebas, creamos el test para la función que nos retorna el saludo:

```js
import { getSaludo } from "../../base/02-template-string"

describe('Pruebas en 02-template-string.js', () => {
    test('getSaludo debe de retornar David Ferrer', () => {
        const nombre = 'David'
        const saludo = getSaludo(nombre)

        expect(saludo).toBe(`Hola ${nombre}`)
    })
})
```

Dentro de la consola de comando, para poder correr un archivo de pruebas en especifico, usamos la bandera p para ingresar un patrón del nombre del archivo, y de los resultados escogemos el que nos interese.

Podemos crear otro test para poder saber cual es el resultado en caso de que pusieramos un valor por defecto al argumento de la función a probar:

```js
describe('Pruebas en 02-template-string.js', () => {
    ...
    test('getSaludo debe de retornar Hola Carlos si no hay argumento', () => {
        const saludo = getSaludo()

        expect(saludo).toBe(`Hola Carlos|`)
    })
    
})
```

## toEqual

Pasamos a probar el archivo `05-funciones.js`, por lo que dentro del directorio `test/base` creamos el archivo `05-funciones.test.js`. Para evaluar los test de este archivo, necesitamos presionar en consola la tecla W, y otra vez la p para ingresar la expresión regular que coincida que el archivo de nuestro test.

Escribimos el siguiente test, el cual nos va a generar un error:

```js
import { getUser } from "../../base/05-funciones"

describe('Pruebas en 05-funciones.js', () => {
    test('getUser debe retornar un objeto', () => {
        const userTest = {
            uid: 'abc1234',
            username: 'asdfg1928'
        }

        const user = getUser();

        expect(user).toBe(userTest)
    })
    
})
```

El error consiste en que cuando hacemos esta comparación `{} === {}` la respuesta será false, pues los 2 objetos están apuntando a direcciones de memoria diferentes. La manera de asegurarnos de que su contenido es igual, es mediante el método `toEqual()`:

```js
describe('Pruebas en 05-funciones.js', () => {
    test('getUser debe retornar un objeto', () => {
        ...
        expect(user).toEqual(userTest)
    })
})
```

Creamos otro test para la segunda funcion a testear del archivo `05-funciones.js`:

```js
import { getUser, getUsuarioActivo } from "../../base/05-funciones"


describe('Pruebas en 05-funciones.js', () => {
    ...  

    test('getUsuarioActivo debe retornar un objeto con el mismo argumento', () => {
        const username = 'Ferrer'

        expect(getUsuarioActivo(username)).toEqual({
            uid: 'ABC567',
            username
        })
    })
})
```

## Pruebas en el archivo `07-deses-arr.js`

Creamos un nuevo archivo en `test/base` llamado `07-deses-arr.test.js`. Nosotros podemos hacer varios expect dentro de un test:

```js
describe('Pruebas en 07-deses-arr.js', () => {
    test('retornaArreglo debe retornar un arreglo de [string, number]', () => {
        const arr = retornaArreglo()
        expect(arr).toEqual(['ABC', 123])

        const [letras, numeros] = retornaArreglo()
        
        expect(letras).toBe('ABC')
        expect(typeof letras).toBe('string')

        expect(numeros).toBe(123)
        expect(typeof numeros).toBe('number')
    })
})
```

## Pruebas en `08-imp-exp.js` - Arreglos

Lo primero que vamos a hacer, es crear un archivo llamado `src/data/heroes.js` en el que tendremos un arreglo de varios héroes, los cuales vamos a exportar y a usar dentro del archivo que vamos a testear. Luego creamos un archivo de pruebas llamado `08-imp-exp.test.js`. La primera prueba que creamos es para saber si el héroe que se encuentra, el igual al que se encuentra en el arreglo con el mismo id:

```js
import { getHeroeById } from "../../base/08-imp-exp"
import { heroes } from "../../data/heroes"


test('Debe retornar un héroe por id', () => {
    const id = 1
    const heroe = getHeroeById(id)

    const heroeData = heroes.find(hero => hero.id === id )

    expect(heroe).toEqual(heroeData)
})
```

Luego hacemos otro test para validad en caso de que no se encuentre ningún elemento por el id ingresado. En este caso no necesitamos de `toEqual`, ya que `undefined` es un elemento primitivo:

```js
describe('Pruebas en 08-imp-exp.js', () => {
    ...
    test('Debe retornar undefined si el héroe no existe', () => {
        const id = 10
        const heroe = getHeroeById(id)

        expect(heroe).toBe(undefined)
    })
})
```

Ahora procedemos a evaluar por dueños:

```js
import { getHeroesByOwner } from "../../base/08-imp-exp"

describe('Pruebas en 08-imp-exp.js', () => {
    ...
    test('Debe retornar los héroes de DC', () => {
        const owner = 'DC'
        const heroesDC = heroes.filter(h => h.owner === owner)

        const heroesResult = getHeroesByOwner(owner)

        expect(heroesResult).toEqual(heroesDC)
    })

    test('Debe retornar los héroes de Marvel y ser un arreglo de 2 elementos', () => {
        const owner = 'Marvel'
        const heroesMarvel = heroes.filter(h => h.owner === owner)

        const heroesResult = getHeroesByOwner(owner)

        expect(heroesResult).toEqual(heroesMarvel)
        expect(heroesResult.length).toBe(2)
    })    
})
```

También podemos hacer las pruebas para el caso en que se envié un dueño que no existe:

```js
describe('Pruebas en 08-imp-exp.js', () => {
    ...
    test('Deberia retonar', () => {
        const owner = 'Humm'

        const heroesResult = getHeroesByOwner(owner)

        expect(heroesResult).toEqual([])
        expect(heroesResult.length).toBe(0)
    })
})
```

## Pruebas con tareas asíncronas

Vamos a hacer pruebas para el archivo `09-promesas.js`. El primer test que vamos a hacer, es para poder evaluar que se retorna un héroe de manera asíncrona, teniendo en cuenta que la función que es exporta retorna una promesa:

```js
import { getHeroeByIdAsync } from "../../base/09-promesas"
import { heroes } from "../../data/heroes"

describe('Pruebas con promesas', () => {
    test('Debe retornar un héroe async', (done) => {
        const id = 1
        getHeroeByIdAsync(id)
            .then(heroe => {
                expect(heroe).toBe(heroes[0])
                done()
            })
    })
})
```

El segundo test consiste en evaluar el caso en el que el héroe no existe:

```js
describe('Pruebas con promesas', () => {
    ...
    test('Debe de obtener un error si el héroe por id no existe', (done) => {
        const id = 10
        getHeroeByIdAsync(id)
            .catch(error => {
                expect(error).toBe('No se pudo encontrar el héroe')
                done()
            })
    })
})
```

## Pruebas con async-await

Podemos hacer pruebas a una función que ha usado async y await para traer data de una API. En este caso queremos que el test a realizar sea asíncrono, por lo que vamos a esperar la respuesta, para luego evaluarla.

```js
import { getImagen } from "../../base/11-async-await"

describe('Pruebas de async y await', () => {
    test('Debería de retornar el url de la imagen', async () => {
        const url = await getImagen()

        expect(typeof url).toBe('string')
        expect(url.includes('https://')).toBe(true)
    })
    
})
```

## Pruebas sobre componentes de React

Vamos a testear el componente de `<PrimeraApp>`. Lo primero será añadir un archivo llamado `setupTest.js` dentro de la carpeta `src`. El contenido del mismo será lo siguiente:

```js
import "@testing-library/jest-dom/extend-expect"
```

Luego, dentro de `index.js` necesitamos llamar el componente a renderizar como padre:

```js
ReactDOM.render(
    < PrimeraApp nombre = 'David' />,
    divRoot
)
```

Dentro del archivo de pruebas, `PrimeraApp.test.jsx` hacemos la renderización del componente, y luego buscamos la coincidencia con el saludo que le establecemos para testear:

```jsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import PrimeraApp from '../PrimeraApp'


describe('Pruebas en <PrimeraApp />', () => {
    test('Debe mostrar el mensaje "Bienvenido David nn"', () => {
        const saludo = 'Bienvenido David nn'
        render(<PrimeraApp nombre="David" />)
        expect(screen.getByText(saludo)).toBeInTheDocument()
    })
})
```

## Enzyme - Testing unit

El paquete `Enzyme` es un adaptador que nos hace más fácil la vida, en cuanto a pruebas. Para instalar la librería en la versión 17 de React, usamos el comando `npm install --save-dev @wojtekmaj/enzyme-adapter-react-17`. Dentro del archivo `setupTest.js` hacemos la siguiente configuración:

```js
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

Enzyme.configure({ adapter: new Adapter() });
```

Luego creamos un test que nos permita tomarle un snapshot a lo que se está renderizando en pantalla, en base a la renderización del componente que se selecciona:

```js
import { shallow } from 'enzyme'

describe('Pruebas en <PrimeraApp />', () => {
    ...
    test('Debe mostrar <PrimeraApp /> correctamente', () => {
        const wrapper = shallow(<PrimeraApp nombre='David' />)
        expect(wrapper).toMatchSnapshot()
    })
})
```

Cuando se ejecuta el test, se crea una carpeta dentro de `test`, llamada `__snapshots__`. No es recomendable cambiar su contenido de manera manual, por lo que solo la usaremos para los test. Vamos a instalar también el paquete enzyme-to-json con el comando `npm install --save-dev enzyme-to-json`, y hacemos la siguiente configuración dentro de `setupTests.js`:

```js
import { createSerializer } from 'enzyme-to-json'

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }))
```

Ahora necesitamos actualizar el snapshot con la tecla `u` dentro de la terminal en la que estamos corriendo los tests.

## Revisar elementos dentro del componente

Vamos a revisar que la etiqueta `<h1></h1>` contenga un texto en especifico, a partir de lo que se envía por medio de los props del componente `<PrimeraApp />`:

```js
describe('Pruebas en <PrimeraApp />', () => {
    ...    
    test('Debe mostrar el apellido enviado por props', () => {
        const wrapper = shallow(<PrimeraApp nombre='David' apellido='Ferrer' />)
        const textH1 = wrapper.find('h1').text()
        expect(textH1).toBe(`Bienvenido David Ferrer`)
    })
})
```

## Pruebas básicas de CounterApp

Dentro de `index.js` volvemos a dejar a `<CounterApp />` como el componente principal:

```js
ReactDOM.render(
    <CounterApp value={ 125 } />,
    divRoot
)
```

Luego creamos el archivo de pruebas `CounterApp.test.js` en donde hacemos las siguientes pruebas: Primero tomamos una snapshot del componente, teniendo en cuenta que le vamos a dejar un valor por defecto:

```js
import React from 'react'
import { shallow } from 'enzyme'
import CounterApp from '../CounterApp'


describe('Pruebas de <CounterApp />', () => {
    test('Debe mostrar <CounterApp /> correctamente', () => {
        const wrapper = shallow(<CounterApp />)
        expect(wrapper).toMatchSnapshot()
    })
})
```

Segundo, debemos enviar el valor 100 como prop del componente y recibirlo correctamente.

```js
...
describe('Pruebas de <CounterApp />', () => {
    ...    
    test('Debe mostrar 100 en el valor inicial', () => {
        const wrapper = shallow(<CounterApp value={100} />)
        const textH2 = wrapper.find('h2').text()
        expect(textH2).toBe('100')
    })
})
```

## Simular eventos click

Vamos a simular los botones, para ellos hacemos las siguientes pruebas. Algo que va a ocurrir, es que cuando se ejecuta la prueba de aumentar, el valor sube a 11, y cuando se recibe el test, el valor disminuye a 10. Esto ocurre por qué el valor está quedando en memoria durante los test:

```js
describe('Pruebas de <CounterApp />', () => {
    const wrapper = shallow(<CounterApp />)
    ...
    test('Debe incrementar el contador', () => {
        const btn1 = wrapper.find('button').at(0)
        btn1.simulate('click')
        const textH2 = wrapper.find('h2').text()
        expect(textH2).toBe('11')
    })

    test('Debe disminuir el contador', () => {
        const btn1 = wrapper.find('button').at(1)
        btn1.simulate('click')
        const textH2 = wrapper.find('h2').text()
        expect(textH2).toBe('10')
    })
})
```

Una manera de reinicializar los valores del componente es escribiendo lo siguiente: `beforeEach()`. Esta función nos permite que antes de que se haga cada test, se ejecuta una instrucción, en nuestro caso, queremos resetear el componente:

```js
describe('Pruebas de <CounterApp />', () => {
    let wrapper = shallow(<CounterApp />)

    beforeEach(() => {
        wrapper = shallow(<CounterApp />)
    })
    ...

    test('Debe incrementar el contador', () => {
        ...
        expect(textH2).toBe('11')
    })

    test('Debe disminuir el contador', () => {
        ...
        expect(textH2).toBe('9')
    })
})
```

## Pruebas con el botón de reset

Vamos a simular que tenemos el valor del componente en 100, y que luego hacemos 15 clicks al botón de aumentar. Posteriormente le damos click al botón de reset. Esperamos que el valor vuelva a ser 100:

```js
describe('Pruebas de <CounterApp />', () => {
    ...
    test('Debe hacer reset al valor por defecto', () => {
        const wrapper = shallow(<CounterApp value={100} />)
        for (let i = 0; i < 15; i++) {
            wrapper.find('button').at(0).simulate('click')
        }
        wrapper.find('button').at(2).simulate('click')
        const textH2 = wrapper.find('h2').text()
        expect(textH2).toBe('100')
    })
})
```
