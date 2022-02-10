import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { AuthRouter, PrivateRoute, PublicRoute } from '.';
import { login } from '../actions';
import { JournalScreen } from '../components/journal';
import { firebase } from '../firebase/firebase-config'


export const AppRouter = () => {

    const dispatch = useDispatch()

    const [checking, setChecking] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName))
                setIsLoggedIn(true)
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
