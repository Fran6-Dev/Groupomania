import React, { useState } from 'react';
import '../Feed/Card.scss';
import LikeButton from './LikeButton';
import { useSelector, useDispatch } from 'react-redux';
import { dateParser, isEmpty } from '../utils';
import { updatePost } from '../../actions/post.actions';
import DeleteCard from './DeleteCard';

const Card = ({ post }) => {

    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);

    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdated, setTextUpdated] = useState(null);
    const dispatch = useDispatch();


    const updateItem = () => {
        if (textUpdated) {
            dispatch(updatePost(post._id, textUpdated))
        }
        setIsUpdated(false)
    }

    return (
        <li className='card-container' key={post._id}>
            <>
                <div className='card-left'>
                    <img src={!isEmpty(usersData[0]) &&
                        usersData.map((user) => {
                            if (user._id === post.posterId) return user.picture;
                            else return null
                        }).join('')
                    }
                        alt="poster-pic" className='poster-pic' />
                </div>
                <div className="card-right">
                    <div className="card-header">
                        <div className="pseudo">
                            <h3>
                                {
                                    usersData.map((user) => {
                                        if (user._id === post.posterId) return user.pseudo;
                                        else return null;
                                    })}
                            </h3>
                        </div>
                        <span className='date'>{dateParser(post.createdAt)}</span>
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
                    <div className="all-button">

                        {userData._id === post.posterId && (
                            <div className="button-container">
                                <div onClick={() => setIsUpdated(!isUpdated)}>
                                    <img src="./images/icon/edit.svg" alt="edit-button" className='icon' />
                                </div>
                                <DeleteCard id={post._id} />
                            </div>
                        )}
                        <div>
                            <LikeButton post={post} />
                        </div>
                    </div>
                </div>
            </>
        </li >
    )
}



export default Card