import { Redirect, Route, Switch } from 'react-router-dom'
import { LoginScreen, RegisterScreen } from '../components/auth'


export const AuthRouter = () => {
    return (
        <div className="auth__main">
            <div className="auth__box-container">
                <Switch>
                    <Route exact path='/auth/login' component={ LoginScreen } />
                    <Route exact path='/auth/register' component={ RegisterScreen } />
                    <Redirect to='/auth/login' />
                </Switch>
            </div>
        </div>
    )
}