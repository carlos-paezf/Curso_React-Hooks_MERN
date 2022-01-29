# Sección 17: Formas de trabajar con imágenes

## Continuación del proyecto - HéroesApp

Vamos a seguir usando el proyecto de la sección anterior, por lo que instalamos los node_modules con el comando `npm i`. Podemos levantar el proyecto con el comando `npm start` o `yarn start`.

## Formas de trabajar con imágenes

Vamos a copiar la carpeta `assets` dentro del directorio `src`. Dentro del componente `<HeroScreen />` queremos cambiar la manera en que importamos lás imágenes. Una manera estatica sería la siguiente:

```jsx
import batman from '../../assets/dc-batman.jpg'
```

El problema con lo anterior, es que es un recurso estático, y nosotros queremos acceder de manera dinámica a las imágenes. Una manera sería usar una función de webpack llamada [require.context](https://webpack.js.org/guides/dependency-management/#requirecontext), con la que podemos buscar en subdirectorios:

```jsx
const heroImages = require.context('../../assets', true)
```

Cuando queramos llamar la fuente de una imagen de manera dinámica, entonces ya podemos hacer esto:

```jsx
<img src={heroImages(`./${id}.jpg`)} ... />
```

## Tarea - Arreglar la pantalla de héroes

Vamos a hacer lo misma manera de importación de imágenes pero dentro del componente `<HeroCard />` para poder arreglar las rutas de las imágenes, en cada una de las tarjetas que se ven en nuestra aplicación:

```jsx
const heroImages = require.context('../../assets', true)


export const HeroCard = ({...}) => {
    return (
        <div className='col animate__animated  animate__zoomIn animate__faster'>
            <div className="card">
                <div className="row nog-gutters">
                    <div className="col-md-5">
                        <img src={heroImages(`./${id}.jpg`)} className="card-img-top" alt={superhero} />
                    </div>
                    ...
                </div>
            </div>
        </div>
    )
}
```

Una manera de reutilizar el código de importación de las imágenes, es creando un helper en el que exportemos la constante, y luego lo podemos importar en los componentes que lo necesitemos.

```js
export const heroImages = require.context('../assets')
```
