import React from "react";
import { AiOutlineArrowRight, AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./RelatedPost.css";

function RelatedPost({ post }) {
  console.log(post);

  return (
    <>
      <div key={post._id} className="user-post-container">
        <div className="user-post-category">
          <p>{post.category.name}</p>
        </div>
        <div className="user-post-name">
          <strong>{post.title}</strong>
        </div>
        <div className="user-post-image">
          {post.images[0] ? (
            <img
              src={post.images[0].url}
              alt="user_post_image"
              className="user-post-image"
            />
          ) : (
            "no images"
          )}
        </div>
        <div className="user-post-info">
          <strong>{post.price} DA</strong>
          <Link to={`/postDetails/${post._id}`}>
            <button>
              <AiOutlineArrowRight
                size={15}
                color="#f7f7f7"
                fontWeight="bold"
              />
            </button>
          </Link>
        </div>
        <div className="like-button">
          <p>WishList</p>
          <AiOutlineHeart size={15} />
        </div>
      </div>
    </>
  );
}

export default RelatedPost;
