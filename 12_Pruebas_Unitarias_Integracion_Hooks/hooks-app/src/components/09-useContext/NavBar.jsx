import React from 'react';
import { NavLink } from 'react-router-dom'


export const NavBar = () => {

    const routes = [
        { text: 'Home', path: '/' },
        { text: 'About', path: '/about' },
        { text: 'Login', path: '/login' }
    ]

    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className="container-fluid">
                <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                    {
                        routes.map(({ path, text }, i) => (
                            <li key={i} className='nav-item'>
                                <NavLink exact to={path} className="nav-link" activeClassName='active'>{text}</NavLink>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </nav>
    )
}
