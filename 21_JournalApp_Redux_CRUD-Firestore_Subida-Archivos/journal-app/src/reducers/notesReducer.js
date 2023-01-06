import { types } from "../types/types";


/** This is the initial state of the notes reducer. */
const initialState = {
    notes: [],
    active: null
}


/**
 * The `notesReducer` function takes the current state and an action as arguments. 
 * It returns the new state
 * @param [state] - The current state of the reducer.
 * @param action - The action that is being dispatched.
 * @returns The reducer is returning the state. 
 * The notesReducer is a function that takes in the state and an action. The state is an
 * object that contains the notes. The action is an object that contains the type and payload. The type
 * is a string that represents the action that is being performed. The payload is an object that
 * contains the data that is being passed to the reducer. The reducer then returns the new state.
 */
export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.notesActive: return {
            ...state,
            active: { ...action.payload }
        }
        case types.notesLoad: return {
            ...state,
            notes: [ ...action.payload ]
        }
        default: return state;
    }
}