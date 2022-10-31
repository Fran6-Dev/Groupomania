import React from 'react';
import NewPostForm from '../components/Feed/NewPostForm';
import Thread from '../components/Thread';


const Feed = () => {
  return (
    <div className='home'>
      <div className="main">
        <div className="home-header">
          <NewPostForm />
        </div>
        <Thread />
      </div>
    </div>
  );
};

export default Feed;