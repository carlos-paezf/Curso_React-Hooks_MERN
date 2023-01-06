import { db } from "../firebase/firebase-config"
import { types } from "../types/types"


/**
 * It creates a new note in the database and then adds it to the activeNote state.
 * @returns A function that dispatches an action.
 */
export const startNewNotes = () => {
    return async (dispatch, getState) => {
        const { auth: { uid } } = getState()

        const newNote = {
            tittle: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${uid}/journal/notes`).add(newNote)

        dispatch(activeNote(doc.id, newNote))
    }
}


/**
 * The `activeNote` function takes in a note id and a note object and returns an action object with a
 * type of `types.notesActive` and a payload containing the note id and the note object
 * @param id - The id of the note to be activated.
 * @param note - The note object that we want to set as active.
 */
export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})


/**
 * The `setNotes` function takes in a parameter of type `notes` and returns an action of type
 * `types.notesLoad` with the payload of the parameter
 * @param notes - The notes to be loaded.
 */
export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
})