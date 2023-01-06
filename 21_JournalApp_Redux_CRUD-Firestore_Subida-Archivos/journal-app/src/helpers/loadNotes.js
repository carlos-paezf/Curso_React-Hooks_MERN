import { db } from "../firebase/firebase-config"


/**
 * This function loads all of the notes from the user's database
 * @param uid - The user's unique id.
 * @returns An array of objects. Each object has an id and a title.
 */
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