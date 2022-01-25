import React, { useContext } from 'react';
import { UserContext } from './UserContext';

export const AboutScreen = () => {

    const {user, setUser} = useContext(UserContext)

    return (
        <>
            <h2>About Screen</h2>
            <hr />
            <pre className='container'>{ JSON.stringify(user, null, 5) }</pre>
            <button className="btn btn-danger" onClick={() => setUser({})}>Logout</button>
        </>
    )
}
