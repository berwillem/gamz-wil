import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./Post.css";
import NotFound from "../../assets/images/Image_not_available.webp";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Skeleton } from "@mui/material";
import { useState } from "react";
function Post({ category, img_post, name, price, id }) {
  const fallbackImageUrl = NotFound;
  // Determine the image URL to use
  const imageUrl = img_post && img_post.url ? img_post.url : fallbackImageUrl;
  const [loading, setLoading] = useState(true);
  return (
    <div className="post-container">
      <div className="post-category">
        <p>{category}</p>
      </div>
      <div className="post-name">
        <p>{name}</p>
      </div>
      {/* <LazyLoadImage
        src={imageUrl}
        alt="post-image"
        loading="lazy"
        placeholder={
          <Skeleton variant="rectangular" height={200} width={200} />
        }
        onLoad={() => console.log("loaded")}
      /> */}
      {loading && (
        <Skeleton
          variant="rectangular"
          height={200}
          width={200}
          sx={{ borderRadius: "10px" }}
        />
      )}
      <img
        src={imageUrl}
        alt="post-image"
        style={loading ? { display: "none" } : {}}
        onLoad={() => setLoading(false)}
      />

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
