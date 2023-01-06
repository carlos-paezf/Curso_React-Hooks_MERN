import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { JournalScreen } from '../components/journal'
import { AuthRouter } from './AuthRouter'


export const AppRouter = () => {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route path='/auth' component={ AuthRouter } />
                    <Route path='/' component={ JournalScreen } />
                    <Redirect to='/auth/login' />
                </Switch>
            </BrowserRouter>
        </>
    )
}