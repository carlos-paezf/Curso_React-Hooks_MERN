import { db } from "../firebase/firebase-config"


/**
 * It creates a new note in the database.
 * @returns Nothing.
 */
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