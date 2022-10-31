import React from 'react';
import { useDispatch } from "react-redux";
import { deletePost } from '../../actions/post.actions';

const DeleteCard = (props) => {
  const dispatch = useDispatch()

  const deleteQuote = () => {
    dispatch(deletePost(props.id))
  }
  return (
    <div onClick={() => {
      if (window.confirm('Voulez vous supprimer ce post ?'))
        deleteQuote();
    }}>

      <img src="./images/icon/trash.svg" alt="trash" className='icon' />
    </div>
  )
}

export default DeleteCard