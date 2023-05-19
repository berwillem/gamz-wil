import React from "react";
import { useState } from "react";
import { AiOutlineMore, AiFillDelete, AiOutlineUser } from "react-icons/ai";
import "./UserList.css";
import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;


function UsersList({ number, id, date, name, email, order }) {
  const [action, setAction] = useState("action active-action");
  const handelaction = () => {
    if (action === "action active-action") {
      setAction("action ");
    } else {
      setAction("action active-action");
    }
  };
  const deleteUser = (id) => {
    axios
      .delete(baseURL+`/user/${id}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="dashboard_titles">
      <li>{number}</li>
      <li>{id}</li>
      <li>{date}</li>
      <li>{name}</li>
      <li>{email}</li>
      <li className="action-li" onClick={handelaction}>
        <AiOutlineMore />

        <div className={action}>
          <span className="dashbord-ic">
            <AiOutlineUser /> User
          </span>
          <span className="dashbord-ic" onClick={() => deleteUser(id)}>
            <AiFillDelete /> Delete
          </span>
        </div>
      </li>
    </div>
  );
}

export default UsersList;
