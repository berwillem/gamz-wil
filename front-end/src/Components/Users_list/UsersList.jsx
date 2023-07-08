import React, { useState } from "react";
import { AiOutlineMore, AiFillDelete, AiOutlineUser } from "react-icons/ai";
import "./UserList.css";
import axios from "axios";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

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

function UsersList({ number, id, date, name, email, order }) {
  const [action, setAction] = useState("action active-action");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  const handelaction = () => {
    if (action === "action active-action") {
      setAction("action");
    } else {
      setAction("action active-action");
    }
  };

  const deleteUser = (id) => {
    setShowDeleteModal(true);
    // You can set the user ID to a state variable if needed
  };

  const confirmUserDelete = () => {
    // Implement your deletion logic here
    axios
      .delete(baseURL + `/user/${id}`)
      .then((response) => {
        console.log(response.data);
        // Update the user list or take any other necessary action after successful deletion
      })
      .catch((error) => {
        console.error(error);
      });

    setShowDeleteModal(false); // Close the delete modal
  };

  return (
    <div className="dashboard_titles">
      <li>{number}</li>
      <li>{id}</li>
      <li>{date}</li>
      <li>{name}</li>
      <li>{email}</li>
      <li className="action-li">
        <AiOutlineMore onClick={handelaction} />

        <div className={action}>
          <span
            className="dashbord-ic"
            onClick={() => navigate(`/account/${id}`)}
          >
            <AiOutlineUser /> User
          </span>
          <span className="dashbord-ic" onClick={() => deleteUser(id)}>
            <AiFillDelete /> Delete
          </span>
        </div>
      </li>

      <Modal
        isOpen={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
        style={modalStyles}
      >
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this User?</p>
        <div style={modalStyles.buttonsContainer}>
          <button onClick={confirmUserDelete} style={modalStyles.confirmButton}>
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
    </div>
  );
}

export default UsersList;
