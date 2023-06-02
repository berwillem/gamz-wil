import React from "react";
import Ads from "../../Components/Ads/Ads";
import Footer from "../../Components/Footer/Footer";
import Login from "../../Components/Login/Login";
import Navbar from "../../Components/Navbar/Navbar";
import Register from "../../Components/Register/Register";
import TopSelll from "../../Components/TopSelll/TopSelll";
import User from "../../Components/User/User";
import "./Acount.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const baseURL = import.meta.env.VITE_BASE_URL;

function Acount(isDarkMode) {
  // data::
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const { userId } = useParams();
  // states::
  const [banner, setBanner] = useState("");

  const [avatar, setAvatar] = useState("");
  const [NumTel, setNumTel] = useState("");
  const [address, setAdresse] = useState("");
  const [Username, setUsername] = useState("");
  const [poste, setposte] = useState([]);
  const p = isDarkMode.isDarkMode;

  // api call::

  useEffect(() => {
    axios
      .get(baseURL + `/user/${userId}`)
      .then((response) => {
        const userData = response.data;
        setBanner(userData.banner.url);
        setAvatar(userData.avatar.url);
        setNumTel(userData.phone);
        setAdresse(userData.adress);
        setUsername(userData.username);
        setposte(userData.posts);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId]);

  // jsx :::

  return (
    <div className="account-container">
      <Navbar p={p} />
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
            />
          </div>

          <div className="home-bottom">
            <TopSelll />
            <Ads />
          </div>
        </div>
      ) : (
        <div className="account-center">
          <Login />
          <div className="line-account">
            <div className="or">
              <strong>or</strong>
            </div>
          </div>
          <Register />
        </div>
      )}
      <Footer p={p} />
    </div>
  );
}

export default Acount;
