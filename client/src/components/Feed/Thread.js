import React from 'react'
import Card from './Card';


const Thread = () => {

  const post = JSON.parse(localStorage.getItem('post'));
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  return (
    <div>
      <ul>
        {post.map((post) => {
          return <Card post={post} key={post._id} />
        })}
      </ul>

    </div>
  )
}

export default Thread