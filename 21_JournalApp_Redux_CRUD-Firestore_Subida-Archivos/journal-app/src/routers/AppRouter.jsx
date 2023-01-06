import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { AuthRouter, PrivateRoute, PublicRoute } from '.';
import { login, setNotes } from '../actions';
import { JournalScreen } from '../components/journal';
import { firebase } from '../firebase/firebase-config'
import { loadNotes } from '../helpers';


export const AppRouter = () => {

    const dispatch = useDispatch()

    const [checking, setChecking] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async user => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName))
                setIsLoggedIn(true)
                const notes = await loadNotes(user.uid)
                dispatch(setNotes(notes))
            } else {
                setIsLoggedIn(false)
            }
            setChecking(false)
        })
    }, [dispatch, setChecking, setIsLoggedIn])

    if (checking) return <h1>Loading...</h1>


    return (
        <>
            <BrowserRouter>
                <Switch>
                    <PublicRoute path='/auth' isLoggedIn={isLoggedIn} component={AuthRouter} />
                    <PrivateRoute exact path='/' isLoggedIn={isLoggedIn} component={JournalScreen} />
                    <Redirect to='/auth/login' />
                </Switch>
            </BrowserRouter>
        </>
    )
}
