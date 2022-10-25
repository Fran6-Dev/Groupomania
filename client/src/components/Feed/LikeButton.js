import React, { useContext, useEffect, useState } from 'react'
import { UidContext } from '../Context/AppContext';
import axios from 'axios';

const LikeButton = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const uid = useContext(UidContext)
    const [likes, setLikes] = useState(false)

    const like = () => { }

    const unlike = () => { }

    useEffect(() => {
        if (post.likers.includes(uid)) setLiked(true)
    }, [uid, post.likers, liked])

    // useEffect(() => {
    //     const fetchPost = async (postId, userId) => {
    //         await axios({
    //             method: "patch",
    //             url: `${process.env.REACT_APP_API_URL}api/post/like-post/` + postId,
    //             data: { id: userId },
    //         })
    //             .then((res) => {
    //                 setLikes(res.data);
    //                 localStorage.setItem('Likes', JSON.stringify(res.data));

    //             })
    //             .catch((err) => console.log('No likes'));

    //     }
    //     fetchPost();
    // }, []);


    return (
        <div className="like-container">
            {uid && liked === false && (
                <img src="./images/icon/heart.svg" alt="like" onClick={like} />
            )}
            {uid && liked === true && (
                <img src="./images/icon/heart-filled.svg" alt="unlike" onClick={unlike} />
            )}
        </div>
    )
}

export default LikeButton