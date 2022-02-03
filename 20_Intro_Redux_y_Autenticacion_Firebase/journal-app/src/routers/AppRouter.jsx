import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { AuthRouter } from '.';
import { JournalScreen } from '../components/journal';


export const AppRouter = () => {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route path='/auth' component={AuthRouter} />
                    <Route exact path='/' component={JournalScreen} />
                    <Redirect to='/auth/login' />
                </Switch>
            </BrowserRouter>
        </>
    )
}
