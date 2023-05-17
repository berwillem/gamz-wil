import React from 'react'
import { AiOutlineArrowRight, AiOutlineHeart } from 'react-icons/ai'
import './UserPost.css'
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";


function UserPost({posts}) {
  return (
    <>
      {posts?.map((post) =>
       (

        <div className='user-post-container'>
        <div className="user-post-category">
            <p>{post.category.name}</p>
            <AiOutlineDelete/>

        </div>
        <div className="user-post-name">
            <strong>{post.title}</strong>
        </div>
        <div className="user-post-image">
        {post.images[0] ?  <img src={post.images[0].url} alt="user_post_image" className='user-post-image' />:"no images"}  
        </div>
        <div className="user-post-info">
          {console.log("ids",post._id)}
            <strong>{post.price} DA</strong>
           <Link to={`/postDetails/${post._id}`}> <button>       <AiOutlineArrowRight size={15} color='#f7f7f7' fontWeight='bold'/>
  </button></Link>
        </div>
        <div className="like-button">
          <p>WishList</p> <AiOutlineHeart size={15}  /> 
        </div>
  
    </div>
      ))}
    </>
      
      
    
  )
}

export default UserPost