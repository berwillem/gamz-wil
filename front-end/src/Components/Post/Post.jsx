import React from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import './Post.css'
function Post( {category,img_post ,name,price,id}) {
  return (
    <div className='post-container'>
      <div className="post-category">
        <p>{category}</p>
      </div>
      <div className="post-name">
        <p>
          {name}
        </p>
      </div>
      <img src={img_post} alt="post-image" />
      <div className="button-post-container">
        <strong>{price}</strong>
        <Link to={`/postDetails/${id}`}>
      <button>
     
          
       <AiOutlineArrowRight size={17} color='#f7f7f7' fontWeight='bold'/>
     
      </button>
      </Link>
      </div>
    </div>
  )
}

export default Post