import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { addPost, getPosts } from '../../actions/post.actions';
import './NewPostForm.scss';

const NewPostForm = () => {
    const [message, setMessage] = useState("");
    const [postPicture, setPostPicture] = useState(null);
    const [file, setFile] = useState('');
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();


    const handlePost = async () => {
        if (message || postPicture) {
            const data = new FormData();
            data.append('posterId', userData._id);
            data.append('message', message);
            data.append('file', file);

            await dispatch(addPost(data));
            dispatch(getPosts());
            cancelPost();

        } else {
            alert("Veuillez entrez un message.")
        }
    }

    const handlePicture = (e) => {
        setPostPicture(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0]);
    }

    const cancelPost = () => {
        setMessage('');
        setPostPicture('');
        setFile('');
    }

    return (
        <div className="post-container">
            <div className="data">
                <NavLink className='pseudo-feed' to="/profil">
                    <h3 className='profil-pseudo'>Que souhaitez-vous publier {userData.pseudo} ? </h3>
                </NavLink>
                <div className="post-form">
                    <textarea
                        name='message'
                        id='message'
                        placeholder='Quoi de neuf ?'
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                    />
                </div>
                <div className="footer-form">
                    <div className="icon">
                        <input type="file" id='file-upload' name='file' accept='.jpg, .jpeg, .png' onChange={(e) => handlePicture(e)} />
                    </div>
                    <div className="btn-send">
                        {message || postPicture > 20 ? (
                            <button className='cancel' onClick={cancelPost}>Annuler message</button>
                        ) : null}
                        <button className='send' onClick={handlePost}>Envoyer</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewPostForm