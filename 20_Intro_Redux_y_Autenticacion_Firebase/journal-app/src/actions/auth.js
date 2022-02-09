import { types } from "../types/types"
import { firebase, googleAuthProvider } from '../firebase/firebase-config'
import { finishLoading, startLoading } from "."


export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading())
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName))
                dispatch(finishLoading())
            })
            .catch(error => {
                console.log(error)
                dispatch(finishLoading())
            })
    }
}


export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user: { displayName, uid } }) => dispatch(login(uid, displayName)))
    }
}


export const startRegisterWithNameEmailPassword = (email, password, name) => {
    return (dispatch) => {
        dispatch(startLoading())
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                await user.updateProfile({ displayName: name })

                dispatch(login(user.uid, user.displayName))
                dispatch(finishLoading())
            })
            .catch(error => {
                console.log(error)
                dispatch(finishLoading())
            })
    }
}


export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
})
