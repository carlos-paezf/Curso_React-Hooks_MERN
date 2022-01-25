import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { AboutScreen, HomeScreen, LoginScreen, NavBar } from '.';


export const AppRouter = () => {
    return (
        <Router>
            <NavBar />
            <div className="container mt-3">
                <Switch>
                    <Route exact path="/" component={HomeScreen} />
                    <Route exact path="/login" component={LoginScreen} />
                    <Route exact path="/about" component={AboutScreen} />
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    );
}
