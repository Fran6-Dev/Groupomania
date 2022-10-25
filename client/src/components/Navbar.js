import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UidContext } from './Context/AppContext'
import Logout from './Log/Logout'
import './Navbar.scss'

const Navbar = () => {
    const uid = useContext(UidContext);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    return (
        <nav>
            <div className="nav-container">
                <div>
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
                            <div>
                                <h3 className='welcome-text'>Bienvenue {userInfo.pseudo} !</h3>
                            </div>
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