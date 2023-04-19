import React from 'react'
import { AiOutlineArrowRight, AiOutlineHeart } from 'react-icons/ai'
import './UserPost.css'



function UserPost({category ,name ,user_post_image,price}) {
  return (
    <div className='user-post-container'>
        <div className="user-post-category">
            <p>{category}</p>
        </div>
        <div className="user-post-name">
            <strong>{name}</strong>
        </div>
        <div className="user-post-image">
            <img src={user_post_image} alt="user_post_image" className='user-post-image' />
        </div>
        <div className="user-post-info">
            <strong>{price}</strong>
            <button>       <AiOutlineArrowRight size={15} color='#f7f7f7' fontWeight='bold'/>
</button>
        </div>
        <div className="like-button">
          <p>WishList</p> <AiOutlineHeart size={15}  /> 
        </div>

    </div>
  )
}

export default UserPost