import React, { useContext, useEffect } from 'react'
import { NameContext } from '../Context/NameContext'
import axios from "axios";


const UpdateProfil = () => {
    const name = useContext(NameContext);

    // useEffect( async () => {
    //     const name = await axios (process.env.REACT_APP_API_URL'')
    // })




    console.log('TEST', name);


    return (
        <div>
            <h1> Profil de Francis </h1>
        </div>
    )
}

export default UpdateProfil