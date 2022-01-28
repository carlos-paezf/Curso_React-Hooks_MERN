import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../auth';


/**
 * This function is a React component that renders its children if the user is logged in, otherwise it
 * redirects to the login page.
 * @returns A component that renders the children if the user is logged in, otherwise redirects to the
 * login page.
 */
export const PrivateRoute = ({ children }) => {
    const { user: { logged } } = useContext(AuthContext)

    const { pathname, search } = useLocation()
    localStorage.setItem('lastPath', pathname + search)

    return logged ? children : <Navigate to="/login" />
}
