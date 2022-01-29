import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DashboardRoutes, PrivateRoute, PublicRoute } from '.';
import { LoginScreen } from '../login';


/**
 * The AppRouter function returns a BrowserRouter component that contains a Routes component. 
 * The Routes component contains a Route component that renders a PublicRoute component. 
 * The PublicRoute component renders a LoginScreen component. 
 * The Route component also contains a Route component that renders a PrivateRoute component. 
 * The PrivateRoute component renders a DashboardRoutes component.
 */
export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={
                    <PublicRoute>
                        <LoginScreen />
                    </PublicRoute>
                } />
                <Route path='/*' element={
                    <PrivateRoute>
                        <DashboardRoutes />
                    </PrivateRoute>
                } />
            </Routes>
        </BrowserRouter>
    )
}
