# Sección 19: Redux - ¿Qué es? y conceptos

- Redux
- Store
- Middlewares
- Dispatch
- Actions
- State
- Acciones asíncronas

Es una sección sumamente pequeña, pero se dará una explicación teórica sobre Redux antes de entrar en él. La ventaja es que para estas alturas, ya deberíamos de saber sobre el Reducer, el cual es el corazón del Redux, por consecuencia aprender Redux en este instante debería ser más fácil!

## Explicación del patrón Redux

Redux es un contenedor predecible del estado de nuestra aplicación, básicamente es la manera en que podemos controlar en todo momento la información de nuestra aplicación. Redux no es propio de React, también está presente en otros frameworks. En Redux encontramos algo llamado ***Store*** o fuente única de la verdad, allí es donde está la información que mis componentes van a consumir.

Para manejar lo anterior hacemos uso del Reducer, el cual es una función pura para manejar un estado. El **State** será provisto por el **Store**, el cual entrega el estado a la vista, la cual puede disparar alguna acción que cae dentro de un **Dispatcher**, el cual recibe la acción, la abre, la analiza y la entregar a un **Reducer** especial, que combina todos los reducers de nuestra aplicación. Luego se genera un nuevo state desde el **Store** que está envolviendo al conjunto de reducers. Todo lo anterior se aplica si todo el proceso es síncrono.

En el momento en que tengamos que hacer alguna petición asíncrona dentro de las actions, entonces se debe implementar un **Middleware** que le permita tener una funcionalidad externa dentro del **Dispatcher**. El middleware realiza la petición y apenas tenga una respuesta, entrega el contenido al dispatcher para volver a pasar por el reducer.
