import Ads from "../../Components/Ads/Ads";
import Login from "../../Components/Login/Login";
import Register from "../../Components/Register/Register";
import TopSelll from "../../Components/TopSelll/TopSelll";
import User from "../../Components/User/User";
import "./Acount.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const baseURL = import.meta.env.VITE_BASE_URL;

function Acount() {
  // data::
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const token = JSON.parse(localStorage.getItem("user"))?.token || null;
  const { userId } = useParams();
  // states::
  const [banner, setBanner] = useState("");
  const [avatar, setAvatar] = useState("");
  const [NumTel, setNumTel] = useState("");
  const [address, setAdresse] = useState("");
  const [Username, setUsername] = useState("");
  const [poste, setposte] = useState([]);
  const [isOwner, setIsOwner] = useState(false);

  // api call::
  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get(baseURL + `/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const userData = response.data;
          setBanner(userData.banner.url);
          setAvatar(userData.avatar.url);
          setNumTel(userData.phone);
          setAdresse(userData.adress);
          setUsername(userData.username);
          setposte(userData.posts);
          setIsOwner(userData.isOwner);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isLoggedIn, userId, token]);

  // jsx :::

  return (
    <div className="account-container">
      {isLoggedIn ? (
        <div>
          <div className="account-center">
            <User
              user_name={Username}
              phone_number={NumTel}
              address={address}
              banner={banner}
              avatar={avatar}
              posts={poste}
              owner={isOwner}
            />
          </div>

          <div className="home-bottom">
            <TopSelll />
            <Ads ad = {2} />
          </div>
        </div>
      ) : (
        <div className="account-center">
          <Login />
          <div className="line-account">
            <div className="or">
              <strong>ou</strong>
            </div>
          </div>
          <Register />
        </div>
      )}
    </div>
  );
}

export default Acount;
