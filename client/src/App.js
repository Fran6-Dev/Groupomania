import React, { useEffect, useState, useContext } from 'react';
import { UidContext } from './components/Context/AppContext';
import Routes from "./components/Routes";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";

const App = () => {

  const id = useContext(UidContext);
  // const currentPosts = JSON.parse(localStorage.getItem('post'));

  const [uid, setUid] = useState(id);
  const dispatch = useDispatch();
  // const [name, setName] = useState(null);
  // const [post, setPost] = useState(null);
  // const [allUserInfo, setAllUserInfo] = useState(null);


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