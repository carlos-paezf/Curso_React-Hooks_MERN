import React, { useContext } from 'react';
import { UserContext } from './UserContext';

export const LoginScreen = () => {

    const { user, setUser } = useContext(UserContext)

    const handleLogin = () => {
        setUser({ 
            id: 1234, 
            name: 'ferrer',
            email: 'test@mail.com'
        })
    };


    return (
        <>
            <h2>Login Screen</h2>
            <hr />
            <pre className='container'>{ JSON.stringify(user, null, 5) }</pre>
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
        </>
    )
}