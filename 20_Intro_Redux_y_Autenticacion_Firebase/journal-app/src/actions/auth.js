import { types } from "../types/types"
import { firebase, googleAuthProvider } from '../firebase/firebase-config'


export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(login(123, 'Ferrer'))
        }, 3500)
    }
}


export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user: { displayName, uid } }) => dispatch(login(uid, displayName)))
    }
}



export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
})
