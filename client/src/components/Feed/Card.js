import React, { useState } from 'react';
import '../Feed/Card.scss';
import LikeButton from './LikeButton';

const Card = ({ post }) => {

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const allUserInfo = JSON.parse(localStorage.getItem('allUserInfo'));
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdated, setTextUpdated] = useState(null);

    console.log(textUpdated);
    const updateItem = async () => {

    }


    return (
        <li className='card-container' key={post._id}>
            <>
                <div className='card-left'>
                    <img src={
                        allUserInfo.map((user) => {
                            if (user._id === post.posterId) return user.picture;
                        }).join('')
                    }
                        alt="poster-pic" className='poster-pic' />
                </div>
                <div className="card-right">
                    <div className="card-header">
                        <div className="pseudo">
                            <h3>
                                {
                                    allUserInfo.map((user) => {
                                        if (user._id === post.posterId) return user.pseudo;
                                    })}
                            </h3>
                        </div>
                        {/* <span>{(post.createdAt)}</span> */}
                    </div>
                    <div className="send-msg">
                        {isUpdated === false && <p>{post.message}</p>}
                        {isUpdated && (
                            <div className="update-post">
                                <textarea
                                    defaultValue={post.message}
                                    onChange={(e) => setTextUpdated(e.target.value)}
                                />
                                <div className="button-container">
                                    <button className='btn' onClick={updateItem}>
                                        Valider modification
                                    </button>
                                </div>
                            </div>
                        )}
                        {post.picture && <img src={post.picture} alt="card-pic" className='card-pic' />}
                    </div>
                    {userInfo._id === post.posterId && (
                        <div className="button-container">
                            <div onClick={() => setIsUpdated(!isUpdated)}>
                                <img src="./images/icon/edit.svg" alt="edit-button" />
                            </div>
                        </div>
                    )}
                    <div>
                        <LikeButton post={post} />
                    </div>
                </div>
            </>
        </li >
    )
}

export default Card