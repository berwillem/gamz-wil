import React from 'react'
import { AiOutlineArrowRight, AiOutlineHeart } from 'react-icons/ai'
import axios from 'axios';
import { Link } from "react-router-dom";
import { useState,useEffect } from 'react';









function RelatedPost({post}) {
  console.log(post);
    
  return (
      <>
     
        <div key={post._id} className='user-post-container'>
          <div className="user-post-category">
            <p>{post.category.name}</p>
          </div>
          <div className="user-post-name">
            <strong>{post.title}</strong>
          </div>
          <div className="user-post-image">
            <img src={post.images[1].url} alt="user_post_image" className='user-post-image' />
          </div>
          <div className="user-post-info">
            <strong>{post.price} DA</strong>
            <Link to={`/posts/${post._id}`}>
              <button>
                <AiOutlineArrowRight size={15} color='#f7f7f7' fontWeight='bold' />
              </button>
            </Link>
          </div>
          <div className="like-button">
            <p>WishList</p>
            <AiOutlineHeart size={15} />
          </div>
        </div>
  
    </>
     
    
      
  )
    
  
}

export default RelatedPost