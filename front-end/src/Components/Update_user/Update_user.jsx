import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./update_use.css";
import image from "../../assets/Svg/undraw_image_post_re_25wd.svg";
function Update_user() {
  // states:
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [avatar, setAvatar] = useState(image);
  const [banner, setbanner] = useState(image);
  // handlers
  const handleAvatarChange = (event) => {
    setAvatar(URL.createObjectURL(event.target.files[0]));
  };
  const handleBannerChange = (event) => {
    setbanner(URL.createObjectURL(event.target.files[0]));
  };
  return (
    <>
    <div className="images-update">
      <div className="avatar">
        <label htmlFor="avatar-input">
          {avatar ? (
            <img
              src={avatar}
              alt="Avatar"
              style={{
                width: "250px",
                cursor: "pointer",
                border: "2px solid #e81a2a",
                borderRadius: "10px",
              }}
            />
          ) : (
            <span>Click to upload avatar</span>
          )}
        </label>
        <input
          type="file"
          id="avatar-input"
          accept="image/*"
          onChange={handleAvatarChange}
          style={{ display: "none" }}
        />
      </div>
      <div className="banner">
        <label htmlFor="banner-input">
          {banner ? (
            <img
              src={banner}
              alt="Banner"
              style={{
                width: "400px",
                border: "2px solid #e81a2a",
                borderRadius: "10px",
              }}
            />
          ) : (
            <span>Click to upload banner</span>
          )}
        </label>
        <input
          type="file"
          id="banner-input"
          accept="image/*"
          onChange={handleBannerChange}
          style={{ display: "none" }}
        />
      </div>
      </div>

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
          </form>
        </div>
      </div>
    </>
  );
}

export default Update_user;
