import React, { useState } from 'react';
import '../Feed/Card.scss';
import LikeButton from './LikeButton';
import { useSelector, useDispatch } from 'react-redux';
import { dateParser, isEmpty } from '../utils';
import { updatePost } from '../../actions/post.actions';
import { addPost, getPosts } from '../../actions/post.actions';
import DeleteCard from './DeleteCard';

const Card = ({ post }) => {

    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const [postPicture, setPostPicture] = useState(post.picture);
    const [file, setFile] = useState('');
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdated, setTextUpdated] = useState(null);
    const dispatch = useDispatch();



    const handlePicture = (e) => {
        setPostPicture(e.target.files[0]);
        console.log('TARGET', e.target.files[0])
    }

    console.log('POSTPIC', postPicture);

    const updateItem = () => {
        if (textUpdated) {
            dispatch(updatePost(post._id, textUpdated))
        }
        setIsUpdated(false)

        if (postPicture) {
            console.log('>>>>>>>>>>>>>>>')
            const data = { ...post, picture: `./images/posts/${postPicture.name}` }
            // const data = new FormData();
            // data.append('posterId', userData._id);
            // data.append('message', post.message);
            // data.append('file', file);
            console.log('OMG: ', data);
            const message = textUpdated ?? post.message;
            const picture = postPicture ? postPicture.name : undefined;
            dispatch(updatePost(post._id, message, picture));
            dispatch(getPosts());
        }




    }

    console.log('TEST', post[0]);

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
                            </div>
                        )}
                        {isUpdated === false && post.picture && <img src={post.picture} alt="card-pic" className='card-pic' />}
                        {isUpdated && (
                            <div className="update-img">
                                <input type="file" id='file-upload' name='file' accept='.jpg, .jpeg, .png' onChange={(e) => handlePicture(e)} />
                            </div>
                        )}
                        {isUpdated && (
                            <div className="button-container">
                                <button className='btn' onClick={updateItem}>
                                    Valider modification
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="all-button">

                        {(userData._id === post.posterId || userData.role === 'admin') && (
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