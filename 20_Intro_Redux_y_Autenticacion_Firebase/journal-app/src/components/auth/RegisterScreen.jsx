import React from 'react';
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks';
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError, startRegisterWithNameEmailPassword } from '../../actions';


export const RegisterScreen = () => {

    const dispatch = useDispatch()
    const { msgError } = useSelector(state => state.ui)

    const [formValues, handleInputChange] = useForm({
        name: 'Ferrer',
        email: 'ferrer@mail.com',
        password: '12345678',
        confirm_password: '12345678'
    })

    const { name, email, password, confirm_password } = formValues

    const handleRegister = (e) => {
        e.preventDefault()
        isFormValid() && dispatch(startRegisterWithNameEmailPassword(email, password, name))
    }

    const isFormValid = () => {
        if (name.trim().length === 0) {
            dispatch(setError('Name is required'))
            return false
        }
        else if (!validator.isEmail(email)) {
            dispatch(setError('Email is required'))
            return false
        }
        else if (password !== confirm_password || password.length < 5) {
            dispatch(setError('Password should be at least 6 characters and match each other'))
            return false
        }
        dispatch(removeError())
        return true
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>
            <form onSubmit={handleRegister}>
                {
                    msgError && <div className="auth__alert-error">{msgError}</div>
                }
                <input type="text" name='name' value={name} onChange={handleInputChange} className="auth__input" placeholder="Name" autoComplete='off' />
                <input type="text" name='email' value={email} onChange={handleInputChange} className="auth__input" placeholder="Email" autoComplete='off' />
                <input type="password" name='password' value={password} onChange={handleInputChange} className="auth__input" placeholder="Password" autoComplete='off' />
                <input type="password" name='confirm_password' value={confirm_password} onChange={handleInputChange} className="auth__input" placeholder="Confirm Password" autoComplete='off' />

                <button type='submit' className="btn btn-primary btn-block mb-5">Register</button>

                <Link className='link' to="/auth/login">Already registered?</Link>
            </form>
        </>
    )
}
