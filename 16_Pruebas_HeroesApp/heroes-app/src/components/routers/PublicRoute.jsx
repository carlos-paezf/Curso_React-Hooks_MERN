import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../auth';


/**
 * If the user is logged in, redirect to the root route. 
 * 
 * If the user is not logged in, render the children.
 * @returns A component that checks if the user is logged in. If they are, it will render the children.
 * If they are not, it will render the Navigate component.
 */
export const PublicRoute = ({ children }) => {
    const { user: { logged } } = useContext(AuthContext)

    return logged ? <Navigate to="/" /> : children
}
