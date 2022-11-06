import React from 'react'
import './UpdateProfil.scss';
import { useSelector } from "react-redux"
import { dateParser } from '../utils';

const UpdateProfil = () => {

    const userData = useSelector((state) => state.userReducer);

    return (
        <div className='container-profil'>
            <div className="title">
                <h3> Profil de {userData.pseudo}</h3>
            </div>
            <br />
            <div className="img-profil">
                <img src={userData.picture} alt="user-pic" className='img-size' />
            </div>
            <br />
            <div className="bio-profil">
                <h4>Bio</h4>
            </div>
            <div className="bio-text">
                <p>{userData.bio}</p>
            </div>
            <h6>Membre depuis le : {dateParser(userData.createdAt)}</h6>

        </div>
    )
}

export default UpdateProfil