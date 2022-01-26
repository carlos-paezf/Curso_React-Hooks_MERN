import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DashboardRoutes } from '.';
import { LoginScreen } from '../login';


export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<LoginScreen />}></Route>
                <Route path='/*' element={<DashboardRoutes />} />
            </Routes>
        </BrowserRouter>
    )
}
