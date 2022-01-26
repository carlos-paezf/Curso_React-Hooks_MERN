import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'


export const Navbar = () => {

    const navigate = useNavigate()

    const handleLogout = () => {
        navigate('/login', {
            replace: true
        })
    }


    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark px-5">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    Publishers
                </Link>
                <div className="navbar-collapse">
                    <div className="navbar-nav">
                        <NavLink to="/marvel"
                            className={({ isActive }) => 'nav-item nav-link ' + (isActive && 'active')}>
                            Marvel
                        </NavLink>

                        <NavLink to="/dc"
                            className={({ isActive }) => 'nav-item nav-link ' + (isActive && 'active')}>
                            DC
                        </NavLink>
                    </div>
                </div>

                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                    <ul className="navbar-nav ml-auto">

                        <span className="nav-item nav-link text-info mx-3">Ferrer</span>

                        <button className="btn btn-outline-light" onClick={handleLogout}>
                            Logout
                        </button>
                    </ul>
                </div>
            </div>
        </nav >
    )
}
