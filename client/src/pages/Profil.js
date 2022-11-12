import React from 'react';
import UpdateProfil from '../components/Profil/UpdateProfil'
import { useSelector } from 'react-redux'

const Profil = () => {

  const userData = useSelector((state) => state.userReducer);

  return (
    (userData._id) && (<div>
      <UpdateProfil />
    </div>)
  );
};

export default Profil;