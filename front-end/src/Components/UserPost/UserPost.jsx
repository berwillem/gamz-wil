import { useState } from "react";
import axios from "axios";
import { AiOutlineArrowRight, AiOutlineHeart } from "react-icons/ai";
import "./UserPost.css";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import notavalible from "../../assets/images/Image_not_available.png";
import image from "../../assets/no-result-diadem.png";
import Modal from "react-modal";

const baseURL = import.meta.env.VITE_BASE_URL;

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    maxWidth: "400px",
    width: "80%",
    height: "170px",
    margin: "auto",
    padding: "20px",
    border: "none",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  buttonsContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
  },
  confirmButton: {
    padding: "10px 20px",
    marginRight: "10px",
    backgroundColor: "#e63946",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  cancelButton: {
    padding: "10px 20px",
    backgroundColor: "#f1f1f1",
    color: "#333333",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

function UserPost({ posts, owner }) {
  const [deletedPosts, setDeletedPosts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");

  const handlePostDelete = (postId) => {
    setShowDeleteModal(true);
    setPostIdToDelete(postId);
  };

  const confirmPostDelete = () => {
    axios
      .delete(`${baseURL}/post/${postIdToDelete}`)
      .then((response) => {
        setDeletedPosts([...deletedPosts, postIdToDelete]);
        setShowDeleteModal(false);
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  return (
    <>
      {posts.length ? (
        posts.map((post) => {
          if (deletedPosts.includes(post._id)) {
            return null; // Skip rendering the deleted post
          }

          return (
            <div className="user-post-container" key={post._id}>
              <div className="user-post-category">
                <p>{post.category.name}</p>
                {owner && (
                  <AiOutlineDelete onClick={() => handlePostDelete(post._id)} />
                )}
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
                  <img
                    src={notavalible}
                    alt="user_post_image"
                    className="user-post-image"
                  />
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
          );
        })
      ) : (
        <div className="user-post-container">
          <img src={image} alt="no-image" />
        </div>
      )}

      <Modal
        isOpen={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
        style={modalStyles}
      >
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this post?</p>
        <div style={modalStyles.buttonsContainer}>
          <button onClick={confirmPostDelete} style={modalStyles.confirmButton}>
            Yes, delete
          </button>
          <button
            onClick={() => setShowDeleteModal(false)}
            style={modalStyles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
}

export default UserPost;
