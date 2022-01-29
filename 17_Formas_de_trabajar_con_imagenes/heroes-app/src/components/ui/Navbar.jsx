import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../auth';
import { types } from '../../types';


export const Navbar = () => {

    const { user: { name }, dispatch } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch({ type: types.logout })
        navigate('/login', {
            replace: true
        })
    }

    const links = [
        { id: 1, text: 'Marvel', path: '/marvel' },
        { id: 2, text: 'DC', path: '/dc' },
        { id: 3, text: 'Search', path: '/search' },
    ]


    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark px-5">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    Publishers
                </Link>
                <div className="navbar-collapse">
                    <div className="navbar-nav">
                        {
                            links.map(({ id, text, path }) => (
                                <NavLink key={id} to={path}
                                    className={({ isActive }) => 'nav-item nav-link ' + (isActive && 'active')}>
                                    {text}
                                </NavLink>
                            ))
                        }
                    </div>
                </div>

                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                    <ul className="navbar-nav ml-auto">

                        <span className="nav-item nav-link text-info mx-3">{name}</span>

                        <button className="btn btn-outline-light" onClick={handleLogout}>
                            Logout
                        </button>
                    </ul>
                </div>
            </div>
        </nav >
    )
}
