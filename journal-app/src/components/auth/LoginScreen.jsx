import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth"
import { useForm } from "../../hooks"


export const LoginScreen = () => {
    const dispatch = useDispatch()

    const { values, handleInputChange, reset } = useForm({
        email: 'fake@email.com',
        password: 'fake_password'
    })

    const { email, password } = values

    const handleLogin = (e) => {
        e.preventDefault()
        dispatch(startLoginEmailPassword(email, password))
    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin)
    }

    return (
        <>
            <h3 className="auth__title">Login</h3>
            <form onSubmit={ handleLogin } >
                <input type="text" value={ email } onChange={ handleInputChange } name="email" id="email" className="auth__input" placeholder="email" autoComplete="off" />
                <input type="password" value={ password } onChange={ handleInputChange } name="password" id="password" className="auth__input" placeholder="password" autoComplete="off" />
                <button type="submit" className="btn btn-primary btn-block">Login</button>

                <div className="auth__social-networks">
                    <p>Login with social networks</p>

                    <div className="google-btn" onClick={ handleGoogleLogin }>
                        <div className="google-icon-wrapper">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google Button" className="google-icon" />
                        </div>

                        <div className="btn-text">
                            <b>Sign in with Google</b>
                        </div>
                    </div>
                </div>

                <Link to="/auth/register">Create new Account</Link>
            </form>
        </>
    )
}