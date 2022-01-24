import React, { useContext } from 'react';
import { UserContext } from './UserContext';

export const HomeScreen = () => {

    const {user} = useContext(UserContext)

    return (
        <>
            <h2>Home Screen</h2>
            <hr />
            <pre className="container">{ JSON.stringify(user, null, 5) }</pre>
        </>
    )
}
