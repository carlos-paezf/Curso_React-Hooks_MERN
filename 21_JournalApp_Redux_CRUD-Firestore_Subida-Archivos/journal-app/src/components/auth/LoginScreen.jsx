import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import validator from 'validator'
import { removeError, setError, startGoogleLogin, startLoginEmailPassword } from '../../actions';
import { useForm } from '../../hooks';


export const LoginScreen = () => {

    const dispatch = useDispatch()
    const { loading, msgError } = useSelector(state => state.ui)

    const [formValues, handleInputChange] = useForm({
        email: 'ferrer@mail.com',
        password: '12345678'
    })

    const { email, password } = formValues

    const handleLogin = (e) => {
        e.preventDefault()
        isFormValid() && dispatch(startLoginEmailPassword(email, password))
    }

    const isFormValid = () => {
        if (!validator.isEmail(email)) {
            dispatch(setError('Email is required'))
            return false
        }
        else if (password.length < 5) {
            dispatch(setError('Password is required'))
            return false
        }
        dispatch(removeError())
        return true
    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin())
    }


    return (
        <>
            <h3 className="auth__title">Login</h3>
            <form onSubmit={handleLogin}>
                {
                    msgError && <div className="auth__alert-error">{msgError}</div>
                }
                <input type="text" className="auth__input" name='email' value={email} onChange={handleInputChange} placeholder="Email" autoComplete='off' />
                <input type="password" className="auth__input" name='password' value={password} onChange={handleInputChange} placeholder="Password" autoComplete='off' />
                <button type='submit' className="btn btn-primary btn-block" disabled={loading}>Login</button>

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

                <Link className='link' to="/auth/register" onClick={() => dispatch(removeError())}>Create new Account</Link>
            </form>
        </>
    )
}
