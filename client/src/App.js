import React, { useEffect, useState, useContext } from 'react';
import { UidContext } from './components/Context/AppContext';
import Routes from "./components/Routes";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";

const App = () => {
  // affiche l'id unique de l'utilisateur
  const id = useContext(UidContext);


  const [uid, setUid] = useState(id);
  const dispatch = useDispatch();

  // va chercher le token utilisateur
  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true
      })
        .then((res) => {
          setUid(res.data);
        })
        .catch((err) => console.log('No token'));
    }
    fetchToken();
    if (uid) dispatch(getUser(uid))
  }, [dispatch, uid]);


  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;