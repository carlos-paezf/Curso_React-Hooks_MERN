import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../auth';
import { types } from '../../types';


export const LoginScreen = () => {

    const navigate = useNavigate()

    const { dispatch } = useContext(AuthContext)

    const handleLogin = () => {
        const action = {
            type: types.login,
            payload: {
                name: 'David Ferrer'
            }
        }
        dispatch(action)

        const lastPath = localStorage.getItem('lastPath') || '/'

        navigate(lastPath, {
            replace: true
        })
    }


    return (
        <div className='container mt-5'>
            <h1>Login Screen</h1>
            <hr />

            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
        </div>
    )
}
