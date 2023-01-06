import { Link } from "react-router-dom"


export const RegisterScreen = () => {
    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form>
                <input type="text" name="name" id="name" placeholder="Name" className="auth__input" autoComplete="off" />
                <input type="text" name="email" id="email" placeholder="Email" className="auth__input" autoComplete="off" />
                <input type="password" name="password" id="password" placeholder="Password" className="auth__input" />
                <input type="password" name="confirm_password" id="confirm_password" placeholder="Confirm Password" className="auth__input" />
                <button type="submit" className="btn btn-primary btn-block mb-5">Register</button>

                <Link className="link" to="/auth/login">Already registered?</Link>
            </form>
        </>
    )
}