import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { UidContext } from '../Context/AppContext';
import { likePost, unlikePost } from "../../actions/post.actions";

const LikeButton = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const uid = useContext(UidContext)
    const dispatch = useDispatch();

    const like = () => {
        dispatch(likePost(post._id, uid))
        setLiked(true);
    }

    const unlike = () => {
        dispatch(unlikePost(post._id, uid))
        setLiked(false);
    }

    useEffect(() => {
        if (post.likers.includes(uid)) setLiked(true);
        else setLiked(false);
    }, [uid, post.likers, liked])


    return (
        <div className="like-container">
            {uid && liked === false && (
                <img src="./images/icon/heart.svg" alt="like" onClick={like} className='icon' />
            )}
            {uid && liked === true && (
                <img src="./images/icon/heart-filled.svg" alt="unlike" onClick={unlike} className='icon' />
            )}
            <span>{post.likers.length}</span>
        </div>
    )
}

export default LikeButton