import React, { useEffect, useState, useContext } from 'react';
import { UidContext } from './components/Context/AppContext';
import Routes from "./components/Routes";
import axios from "axios";


const App = () => {

  const id = useContext(UidContext);
  const currentPosts = JSON.parse(localStorage.getItem('post'));

  const [uid, setUid] = useState(id);
  const [name, setName] = useState(null);
  const [post, setPost] = useState(null);
  const [allUserInfo, setAllUserInfo] = useState(null);


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
        url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
        withCredentials: true
      })
        .then((res) => {
          setName(res.data);
          localStorage.setItem('userInfo', JSON.stringify(res.data));
        })
        .catch((err) => console.log('No name'));

    }
    fetchName();
  }, [uid]);

  useEffect(() => {
    const allUserInfo = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/user`,
        withCredentials: true
      })
        .then((res) => {
          setAllUserInfo(res.data);
          localStorage.setItem('allUserInfo', JSON.stringify(res.data));
        })
        .catch((err) => console.log('No user info available'));

    }
    allUserInfo();
  }, []);


  useEffect(() => {
    const fetchPost = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/post`,
        withCredentials: true
      })
        .then((res) => {
          setPost(res.data);
          localStorage.setItem('post', JSON.stringify(res.data));

        })
        .catch((err) => console.log('No Post Available'));

    }
    fetchPost();
  }, []);

  useEffect(() => {
    const updatePost = async () => {
      await axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}api/post/${uid}`,
        // data: { message },
        withCredentials: true
      })
        .then((res) => {
          setPost(res.data);
          // localStorage.setItem('post', JSON.stringify(res.data));

        })
        .catch((err) => console.log('Error message'));

    }
    updatePost();
  }, [uid]);



  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;