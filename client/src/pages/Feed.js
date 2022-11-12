import React from 'react';
import NewPostForm from '../components/Feed/NewPostForm';
import Thread from '../components/Thread';
import { useSelector } from 'react-redux'


const Feed = () => {
  const userData = useSelector((state) => state.userReducer);

  return (
    (userData._id) && (<div className='home'>
      <div className="main">
        <div className="home-header">
          <NewPostForm />
        </div>
        <Thread />
      </div>
    </div>)
  );
};

export default Feed;