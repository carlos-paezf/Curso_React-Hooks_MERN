import { types } from "../types";


/**
 * The `authReducer` function takes in the current state of the `auth` key in the `store` object, and
 * an action. 
 * It returns the new state of the `auth` key in the `store` object.
 * @param [state] - the current state of the store
 * @param action - the action object that was dispatched
 * @returns The state object.
 */
export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login: return { ...action.payload, logged: true }
        case types.logout: return { logged: false }
        default: return state;
    }
}
