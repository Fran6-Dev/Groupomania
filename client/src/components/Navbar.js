import React, { useContext } from 'react'
import { useSelector } from "react-redux"
import { NavLink } from 'react-router-dom'
import { UidContext } from './Context/AppContext'
import Logout from './Log/Logout'
import './Navbar.scss'

const Navbar = () => {
    const uid = useContext(UidContext);
    const userData = useSelector((state) => state.userReducer);


    return (
        <nav>
            <div className="nav-container">
                <div>
                    <NavLink to="/">
                        <div className="logo">
                            <img src="./logo/navbar-logo.png" alt="logo barre de navigation" className='nav-logo' />
                        </div>
                    </NavLink>
                </div>
                {uid ? (
                    <ul>
                        <li></li>
                        <li className='welcome'>
                            <div>
                                <h3 className='welcome-text'>Bienvenue {userData.pseudo} !</h3>
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