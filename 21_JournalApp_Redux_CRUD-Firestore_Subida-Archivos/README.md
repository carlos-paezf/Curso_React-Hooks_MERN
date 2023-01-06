# Sección 21: JournalApp - Redux - CRUD en Firestore y Subida de Archivos

- CRUD hacia Firestore
- Expandiendo nuestro store añadiendo otros reducers
- Seleccionar y subir archivos
- Animaciones adicionales a nuestra aplicación
- Limpieza en el logout

Esta sección está enfocada ahora en las entradas de nuestro diario, asegurándose de que grabe únicamente en el documento del usuario autenticado.

## Continuación del proyecto - JournalApp

Estamos usando el proyecto de la sección anterior, y para poder tener de nuevo los node_modules, usamos el comando `yarn install` dentro del directorio del proyecto. Para levantar el proyecto usamos el comando `yarn start`. Lo siguiente que vamos a hacer, es mostrar el nombre del usuario que actualmente está autenticado en nuestra página, para lo cual usamos el hook `useSelector` dentro del componente `<Sidebar />`:

```jsx
export const Sidebar = () => {
    ...
    const { name } = useSelector(state => state.auth)
    ...
    return (
        <aside className="journal__sidebar">
            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    ...
                    <span>{ name }</span>
                </h3>
                ...
            </div>
            ...
        </aside>
    )
}
```

## NotesReducer

Vamos a crear un nuevo archivo para el reducer de las notas:

```js
const initialState = {
    notes: [],
    active: null
}

export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        default: return state;
    }
}
```

Luego dentro de `store.js` añadimos el reducer recién creado dentro de la combinación de reducers que se envían al store:

```js
const reducers = combineReducers({
    ...,
    notes: notesReducer
})
```

Dentro del componente `<JournalScreen />` vamos a tener que saber cuando tenemos una nota activa para mostrar su contenido, o en caso contrario mostrar el componente de que no hay nada seleccionado. Para ello necesitamos acceder a la propiedad `active` del estado de las notas dentro del store, mediante el hook `useSelector`:

```jsx
export const JournalScreen = () => {

    const { active } = useSelector(state => state.notes)

    return (
        <div className="journal__main-content">
            <Sidebar />
            <main>
                { active ? <NoteScreen /> : <NothingSelected /> }                
            </main>
        </div>
    )
}
```

## Crear una nueva nota

Dentro de la consola de Firebase, en la sección de Firestore Database, ingresamos para poder crear una nueva base de datos, en la que vamos a almacenar las notas que ingresen los usuarios. Firestore Database es una base de datos no relacional, por lo que usamos colecciones y documentos para almacenar la información. El árbol dentro de la base de datos se intercala entre colección y documentos, no podemos tener una colección dentro de una colección, o un documento dentro de un documento.

Ahora editamos las reglas de la base de datos, dejando la siguiente configuración:

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

Vamos a definir los tipos de las acciones para el reducer de las notas:

```js
export const types = {
    ...,
    notesAddNew: '[Notes] Add new entry',
    notesActive: '[Notes] Set active note',
    notesLoad: '[Notes] Load notes',
    notesUpdated: '[Notes] Updated note saved',
    notesFileURL: '[Notes] Updated image url',
    notesDelete: '[Notes] Deleted note',
    notesLogoutCleaning: '[Notes] Logout Cleaning'
}
```

Luego, creamos las acciones para las notas, dentro del archivo `notes.js`. La primera acción será crear una nueva nota. Dicha acción es una acción asíncrona que retorna un callback que recibe por parámetros el dispatch y una función para obtener el state que se almacena dentro del store, de está manera evitar enviar parámetros dentro de la acción.

Dentro de está primera acción requerimos el uid del usuario, por lo que accedemos dentro del objeto de auth. Luego creamos un objeto con la información de la nota, la cual es enviada a una nueva colección dentro de la base de datos:

```js
export const startNewNotes = () => {
    return async (dispatch, getState) => {
        const { auth: { uid } } = getState()

        const newNote = {
            tittle: '',
            body: '',
            date: new Date().getTime()
        }

        await db.collection(`${uid}/journal/notes`).add(newNote)
    }
}
```

Dentro del componente `<Sidebar />` creamos una función que nos dispare la acción recién creada, cada que tocamos el botón de nueva entrada.

```jsx
export const Sidebar = () => {
    ...
    const handleAddNewEntry = () => {
        dispatch(startNewNotes())
    }
    return (
        <aside className="journal__sidebar">
            ...
            <div className="journal__new-entry" onClick={handleAddNewEntry}>...</div>
            ...
        </aside>
    )
}
```

## Activar la nota creada

Volvemos a las reglas de la base de datos en Firestore. Debemos cambiar la regla de que cualquiera puede hacer una escritura, a solo aquellos que están autenticados:

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

Vamos a crear una nueva acción que se va a activar de manera síncrona cuando creamos una nueva nota. Dicha acción retorna un objeto que contiene el tipo de la acción, y como payload, envía el id del documento creado en Firestore junto a la copia del contenido de la nota.

```js
export const startNewNotes = () => {
    return async (dispatch, getState) => {
        ...
        const doc = await db.collection(`${uid}/journal/notes`).add(newNote)
        dispatch(activeNote(doc.id, newNote))
    }
}


export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})
```

Ahora, dentro del reducer de las notas, definimos la funcionalidad del tipo `notesActive`. Retornamos una copia del estado junto a al payload que le enviamos en la acción:

```js
export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.notesActive: return {
            ...state,
            active: { ...action.payload }
        }
        ...
    }
}
```

## Cargar notas de Firestore

Vamos a crear un nuevo directorio llamado `helpers`, y dentro del mismo un nuevo archivo llamado `loadNotes.js` con una función del mismo nombre, la cual vamos a usar dentro del componente `<AppRouter />`:

```jsx
export const AppRouter = () => {
    ...
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user?.uid) {
                ...
                const notes = loadNotes(user.uid)
            } else {
                ...
            }
            ...
        })
    }, [...])
    ...
}
```

La función del helper va ser una petición asíncrona, la cual va a retornar las notas que estén en la colección del usuario autenticado. Con el objeto que está retornando, debemos hacer uso de la función `forEach` propia de Firebase para poder obtener la data de cada elemento resultante, y luego añadirlos a un arreglo que contiene objetos con las notas y el id de cada una de ellas, el cual es el return de la función.

```js
export const loadNotes = async (uid) => {
    const notesSnap = await db.collection(`${uid}/journal/notes`).get()
    const notes = []

    notesSnap.forEach(snapChildren => {
        notes.push({
            id: snapChildren.id,
            ...snapChildren.data()
        })
    })

    return notes
}
```

Ahora debemos crear una nueva acción que nos permita cargar las notas que se obtienen, dentro del estado del reducer.

```js
export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
})
```

Igualmente debemos definir el comportamiento del tipo `notesLoad` dentro del reducer:

```js
export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        ...
        case types.notesLoad: return {
            ...state,
            notes: [ ...action.payload ]
        }
        ...
    }
}
```

Luego, de nuevo dentro del componente `<AppRouter />` hacemos un dispatch con las notas cargadas mediante el `useEffect`, pero debemos tener en cuenta que cargar las notas es un método asíncrono, por lo que debemos convertir el callback de `onAuthStateChanged` en async para poder hacer un await del helper `loadNotes` y retornar el objeto iterable:

```jsx
export const AppRouter = () => {
    ...
    useEffect(() => {
        firebase.auth().onAuthStateChanged(async user => {
            if (user?.uid) {
                ...
                const notes = await loadNotes(user.uid)
                dispatch(setNotes(notes))
            } else { ... }
            ...
        })
    }, [...])
    ...
}
```

## Optimización de la petición de carga de notas

Vamos a crear una acción que nos permita optimizar la petición de la carga de las notas, logrando así que ya no hagamos el llamado dentro del `useEffect` de `<AppRouter />`, sino que hagamos un dispatch de una acción.
