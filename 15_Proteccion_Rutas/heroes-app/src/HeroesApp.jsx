import React, { useEffect, useReducer } from 'react';
import { AuthContext, authReducer } from './auth';
import { AppRouter } from './components/routers';


/**
 * This function returns the user object stored in localStorage, or an empty object if there is no user
 * object stored.
 * @returns The user object.
 */
const init = () => JSON.parse(localStorage.getItem('user')) || { logged: false }


const HeroesApp = () => {

    const [user, dispatch] = useReducer(authReducer, {}, init);

    /* When the user changes, update the local storage. */
    useEffect(() => {
        if (!user) return
        localStorage.setItem('user', JSON.stringify(user))
    }, [user])

    return (
        <AuthContext.Provider value={{ user, dispatch }}>
            <AppRouter />
        </AuthContext.Provider>
    )
}

export default HeroesApp;
