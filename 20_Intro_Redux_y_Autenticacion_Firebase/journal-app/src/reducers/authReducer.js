import { types } from "../types/types";

/**
 * The `authReducer` function takes in the current state of the `auth` key in the `store` object, and
 * returns a new state based on the type of action that is passed in
 * @param [state] - The current state of the reducer.
 * @param action - The action object that was dispatched.
 * @returns The reducer is returning an object with the uid and name.
 */
export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login: return {
            uid: action.payload.uid,
            name: action.payload.displayName
        }
        case types.logout: return {}

        default: return state
    }
}