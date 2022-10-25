import React from 'react'
import './UpdateProfil.scss';

const UpdateProfil = () => {

    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    return (
        <div className='container-profil'>
            <div className="title">
                <h3> Profil de {userInfo.pseudo}</h3>
            </div>
            <br />
            <div className="img-profil">
                <img src={userInfo.picture} alt="user-pic" className='img-size' />
            </div>
            <br />
            <div className="bio-profil">
                <h4>Bio</h4>
            </div>
            <div className="bio-text">
                <p>{userInfo.bio}</p>
            </div>

        </div>
    )
}

export default UpdateProfil