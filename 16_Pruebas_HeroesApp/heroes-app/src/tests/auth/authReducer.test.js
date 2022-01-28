import { authReducer } from "../../auth"
import { types } from "../../types"


describe('Test to reducer authReducer', () => {

    const logoutState = { logged: false }
    const userState = {
        logged: true,
        name: 'Test'
    }

    /* The authReducer function takes two parameters: state and action. 
    The state parameter is the current state of the reducer. 
    The action parameter is the action that was dispatched. 
    The reducer returns a new state.
    
    The reducer is a pure function. 
    It should not modify the state passed to it. 
    It should return a new state without mutating the old state. */
    it('Should return the default state', () => {
        const state = authReducer(logoutState, {})
        expect(state).toEqual({ logged: false })
    })

    test('Should authenticate and put the username', () => {
        const action = {
            type: types.login,
            payload: { name: 'Test' }
        }
        const newState = authReducer(logoutState, action)
        expect(newState).toEqual(userState)
    })

    it('Should delete the username and logged in false', () => {
        const action = {
            type: types.logout
        }
        const newState = authReducer(userState, action)
        expect(newState).toEqual(logoutState)
    })
})