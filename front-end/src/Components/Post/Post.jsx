import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./Post.css";
import NotFound from "../../assets/images/Image_not_available.webp";
function Post({ category, img_post, name, price, id }) {
  const fallbackImageUrl = NotFound;
  // Determine the image URL to use
  const imageUrl = img_post && img_post.url ? img_post.url : fallbackImageUrl;

  return (
    <div className="post-container">
      <div className="post-category">
        <p>{category}</p>
      </div>
      <div className="post-name">
        <p>{name}</p>
      </div>
      <img src={imageUrl} alt="post-image" />
      <div className="button-post-container">
        <strong>{price} DA</strong>
        <Link to={`/postDetails/${id}`}>
          <button className="postbtn">
            <AiOutlineArrowRight size={17} color="#f7f7f7" fontWeight="bold" />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Post;
