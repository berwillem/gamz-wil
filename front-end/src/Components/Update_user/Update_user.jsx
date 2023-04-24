import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./update_use.css";
import avatarImage from "../../assets/images/avatar.png";
import bannerImage from "../../assets/images/banner.png";
function Update_user() {
  // states:
  const [nom, setNom] = useState("");
  const [prénom, setPrénom] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [avatar, setAvatar] = useState(avatarImage);
  const [banner, setbanner] = useState(bannerImage);
  const [genre, setGenre] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  // daat :
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.id;
  // handlers
  const handleAvatarChange = (event) => {
    setAvatar(URL.createObjectURL(event.target.files[0]));
  };
  const handleBannerChange = (event) => {
    setbanner(URL.createObjectURL(event.target.files[0]));
  };
  return (
    <>
      <form>
        <div className="images-update">
          <div className="avatar">
            <label htmlFor="avatar-input">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Avatar"
                  style={{
                    width: "150px",
                    height: "120px",
                    cursor: "pointer",
                    border: "2px solid ",
                    borderRadius: "15px",
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
            <strong>
              <p>votre photo de profile *</p>
            </strong>
          </div>
          <div className="banner">
            <label htmlFor="banner-input">
              {banner ? (
                <img
                  src={banner}
                  alt="Banner"
                  style={{
                    width: "300px",
                    height: "120px",
                    cursor: "pointer",
                    border: "2px solid ",
                    borderRadius: "15px",
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
            <strong>
              <p>votre photo de couverture *</p>
            </strong>
          </div>
        </div>

        <div className="update_user">
          <div className="account_details">
            <div className="title_account_details">
              <h1>Account Details :</h1>
            </div>
            <div className="form-style">
              <label htmlFor="">
                <strong>prénom *</strong>
                <input
                  name="prénom"
                  value={prénom}
                  type="text"
                  placeholder="write your First Name"
                  onChange={(e) => setPrénom(e.target.value)}
                />
              </label>
              <label>
                <strong>nom *</strong>
                <input
                  name="nom"
                  value={nom}
                  type="text"
                  placeholder="write your LastName"
                  onChange={(e) => setNom(e.target.value)}
                />
              </label>
              <label>
                <strong>date de naissance *</strong>
                <input
                  name="dateNaissance"
                  value={dateNaissance}
                  type="date"
                  onChange={(e) => setDateNaissance(e.target.value)}
                />
              </label>
              <label>
                <strong>nom d'utilisateur *</strong>
                <input
                  name="DisplayName"
                  value={displayName}
                  type="text"
                  placeholder="write your DisplayName"
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </label>
              <label>
                <strong>genre *</strong>
                <div>
                  <input
                    name="genre"
                    type="checkbox"
                    value="Homme"
                    checked={genre === "Homme"}
                    onChange={(e) => setGenre(e.target.value)}
                  />
                  <label htmlFor="male">Homme</label>
                </div>
                <div>
                  <input
                    name="genre"
                    type="checkbox"
                    value="Famme"
                    checked={genre === "Famme"}
                    onChange={(e) => setGenre(e.target.value)}
                  />
                  <label htmlFor="female">Famme</label>
                </div>
              </label>
              <button>sumbit</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Update_user;
