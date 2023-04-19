import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./update_use.css";

function Update_user() {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [cnpassword, setCnPassword] = useState("");
  return (
    <div className="update_user">
      <div className="account_details">
        <div className="title_account_details">
          <h1>Account Details :</h1>
        </div>
        <form
        //  onSubmit={handleSubmit}
        >
          <label htmlFor="">
            <strong>First Name *</strong>
            <input
              name="First Name"
              value={firstName}
              type="text"
              placeholder="write your First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label>
            <strong>Last Name *</strong>
            <input
              name="LastName"
              value={lastName}
              type="text"
              placeholder="write your LastName"
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <label>
            <strong>Display Name *</strong>
            <input
              name="DisplayName"
              value={displayName}
              type="text"
              placeholder="write your DisplayName"
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </label>
          
          {/* <div className="password_title">
            <h3>Password change</h3>
          </div>
          <label>
            <strong>Current password (leave blank to leave unchanged)</strong>
            <input
              name="Current Password"
              value={currentPassword}
              type="text"
              placeholder="write your Current Password"
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </label>{" "}
          <label>
            <strong>New password (leave blank to leave unchanged)</strong>
            <input
              name="New Password"
              value={newPassword}
              type="password"
              placeholder="write your New Password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>{" "}
          <label>
            <strong>Confirm new password</strong>
            <input
              name="Confirm new password"
              value={cnpassword}
              type="text"
              placeholder="write your Confirm new password"
              onChange={(e) => setCnPassword(e.target.value)}
            />
          </label>
          <button type="submit">
            <strong>Save Changes</strong>
          </button> */}
        </form>
      </div>
    </div>
  );
}

export default Update_user;
