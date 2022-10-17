import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UidContext } from './Context/AppContext'
import { NameContext } from './Context/NameContext'
import Logout from './Log/Logout'
import './Navbar.scss'

const Navbar = () => {
    const uid = useContext(UidContext);
    const name = useContext(NameContext);

    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink to="/">
                        <div className="logo">
                            <img src="./logo/navbar-logo.png" alt="logo barre de navigation" />
                        </div>
                    </NavLink>
                </div>
                {uid ? (
                    <ul>
                        <li></li>
                        <li className='welcome'>
                            <NavLink to="">
                                <h5>Bienvenue 'valeur dynamique'</h5>
                            </NavLink>
                        </li>
                        <Logout />
                    </ul>
                ) : (
                    <ul>
                        <li></li>
                        <li>
                            <NavLink to="/login">
                                <img src="./logo/enter.png" alt="connexion" className='login' />
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    )
}

export default Navbar