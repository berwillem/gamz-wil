import React, { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import "./update_use.css";
import avatarImage from "../../assets/images/avatar.png";
import bannerImage from "../../assets/images/banner.png";
import Swal from "sweetalert2";
const baseURL = import.meta.env.VITE_BASE_URL;
function Update_user() {
  const navigate=useNavigate()
  // states:
  const [nom, setNom] = useState("");
  const [prénom, setPrénom] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [avatar, setAvatar] = useState(avatarImage);
  const [avatarFile, setAvatarFile] = useState(null);
  const [banner, setBanner] = useState(bannerImage);
  const [bannerFile, setBannerFile] = useState(null);
  const [genre, setGenre] = useState("");
  const [adress, setAdress] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [phone, setPhone] = useState("");
  // data :
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const id = user.id;
  useEffect(() => {
    const userAvatar = user.avatar.url;
    const userBanner = user.banner.url;
    if (userAvatar) {
      setAvatar(userAvatar);
    }

    if (userBanner) {
      setBanner(userBanner);
    }
  }, []);

  // handlers
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setAvatarFile(file);
    setAvatar(URL.createObjectURL(file));
  };
  const handleBannerChange = (event) => {
    const file = event.target.files[0];
    setBannerFile(file);
    setBanner(URL.createObjectURL(file));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", displayName);
    formData.append("nom", nom);
    formData.append("prenom", prénom);
    formData.append("genre", genre);
    formData.append("adress", adress);
    formData.append("dateNaissance", dateNaissance);
    formData.append("phone", phone);
    formData.append("id", id);
    formData.append("avatar", avatarFile);
    formData.append("banner", bannerFile);

    try {
      const res = await axios.put(
        baseURL+`/user/`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // Update the user object with the new values
      user.avatar.url = res.data.avatar.url;
      user.avatar.public_id = res.data.avatar.public_id;
      user.banner.url = res.data.banner.url;
      user.banner.public_id = res.data.banner.public_id;
      user.username = res.data.username;
      user.infoUpdate = res.data.infoUpdate;
      const updatedUserString = JSON.stringify(user);
      localStorage.setItem("user", updatedUserString);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Your acount has been updated successfully!',
      });
      navigate("/")

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
              <p>Modifier votre photo de profile *</p>
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
              <p>Modifier votre photo de couverture *</p>
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
                <strong>Adress *</strong>
                <input
                  name="adress"
                  value={adress}
                  type="text"
                  placeholder="write your adress"
                  onChange={(e) => setAdress(e.target.value)}
                />
              </label>
              <label>
                <strong>phone *</strong>
                <input
                  name="phone"
                  value={phone}
                  type="text"
                  placeholder="write your phone number"
                  onChange={(e) => setPhone(e.target.value)}
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
