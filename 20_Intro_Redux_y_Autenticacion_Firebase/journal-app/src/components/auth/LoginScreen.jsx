import React from 'react';
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { startGoogleLogin, startLoginEmailPassword } from '../../actions';
import { useForm } from '../../hooks';


export const LoginScreen = () => {

    const dispatch = useDispatch()

    const [formValues, handleInputChange] = useForm({
        email: 'ferrer@mail.com',
        password: '12345678'
    })

    const { email, password } = formValues

    const handleLogin = (e) => {
        e.preventDefault()
        dispatch(startLoginEmailPassword(email, password))
    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin())
    }


    return (
        <>
            <h3 className="auth__title">Login</h3>
            <form onSubmit={handleLogin}>
                <input type="text" className="auth__input" name='email' value={email} onChange={handleInputChange} placeholder="Email" autoComplete='off' />
                <input type="password" className="auth__input" name='password' value={password} onChange={handleInputChange} placeholder="Password" autoComplete='off' />
                <button type='submit' className="btn btn-primary btn-block">Login</button>

                <div className="auth__social-networks">
                    <p>Login with social networks</p>

                    <div className="google-btn" onClick={handleGoogleLogin}>
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>

                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link className='link' to="/auth/register">Create new Account</Link>
            </form>
        </>
    )
}
