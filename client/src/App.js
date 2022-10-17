import React, { useEffect, useState } from 'react';
import { UidContext } from './components/Context/AppContext';
import { NameContext } from './components/Context/NameContext';
import Routes from "./components/Routes";
import axios from "axios";


const App = () => {
  const [uid, setUid] = useState(null);
  const [name, setName] = useState(null);

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
  }, [uid]);

  useEffect(() => {
    const fetchName = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}name`,
        withCredentials: true
      })
        .then((res) => {
          setName(res.data);
          console.log(res.data)
        })
        .catch((err) => console.log('No name'));

    }
    fetchName();
  }, [name]);


  return (
    <UidContext.Provider value={uid}>
      <NameContext.Provider value={name}>
        <Routes />
      </NameContext.Provider>
    </UidContext.Provider>
  );
};

export default App;