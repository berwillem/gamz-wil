import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineArrowRight } from "react-icons/ai";
import "./UserPost.css";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import notavalible from "../../assets/images/Image_not_available.webp";
import image from "../../assets/no-result-diadem.webp";
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
    height: "max-content",
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
  const [autres, setAutres] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");

  const handleRadioChange = (event) => {
    setAutres(event.target.value === "autres");
    setSelectedValue(event.target.value);
  };
  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };
  useEffect(() => {
    const fetchIsAdmin = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setIsAdmin(user?.isAdmin || false);
      } catch (error) {
        console.error("Error fetching isAdmin value:", error);
      }
    };

    fetchIsAdmin();
  }, []);

  const handlePostDelete = (postId) => {
    setShowDeleteModal(true);
    setPostIdToDelete(postId);
  };

  const confirmPostDelete = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const sessionId = user.sessionId;
    const isAdmin = user.isAdmin;
    const config = {
      params: {
        reason: selectedValue,
      },
      headers: {
        "session-id": sessionId,
        "is-admin": isAdmin,
      },
    };

    axios
      .delete(`${baseURL}/post/${postIdToDelete}`, config)
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
                {isAdmin || owner ? (
                  <AiOutlineDelete onClick={() => handlePostDelete(post._id)} />
                ) : null}
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
        <form action="" onSubmit={confirmPostDelete}>
          <h2>Confirm Delete</h2>
          <p>pourquoi voulais vous le supprimer?</p>
          <div className="qst">
            <div>
              <input
                type="radio"
                id="vendu avec gamz"
                name="options"
                required
                value="sold_in"
                checked={selectedValue === "sold_in"}
                onChange={handleRadioChange}
              />
              <label htmlFor="vendu avec gamz">vendu avec gamz</label>
            </div>
            {/* <div>
          <input
            type="radio"
            id="je veux plus le vendre"
            name="options"
            value="je veux plus le vendre"
            checked={selectedValue === 'je veux plus le vendre'}
            onChange={handleRadioChange}
            required
          />
          <label htmlFor="opje veux plus le vendretion2">je veux plus le vendre</label>
        </div> */}
            <div>
              <input
                type="radio"
                id="vendu autres part"
                name="options"
                value="sold_out"
                checked={selectedValue === "sold_out"}
                onChange={handleRadioChange}
                required
              />
              <label htmlFor="endu autres part">vendu autres part</label>
            </div>
            <div>
              <input
                type="radio"
                id="autres"
                name="options"
                value="other"
                checked={selectedValue === "other"}
                onChange={handleRadioChange}
                required
              />
              <label htmlFor="autres">autres</label>
            </div>
            {autres && (
              <textarea
                className="area"
                type="text"
                placeholder="autre"
                onChange={handleTextareaChange}
              />
            )}
          </div>
          <div style={modalStyles.buttonsContainer}>
            <button type="submit" style={modalStyles.confirmButton}>
              Yes, delete
            </button>
            <button
              onClick={() => setShowDeleteModal(false)}
              style={modalStyles.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default UserPost;
