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

function Acount(isDarkMode) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userId = JSON.parse(localStorage.getItem("user"))?.id || null;

  const [banner, setBanner] = useState("");
  const [data, setData] = useState({});
  const [avatar, setAvatar] = useState("");
  const [NumTel, setNumTel] = useState("");
  const [address, setAdresse] = useState("");
  const [Username, setUsername] = useState("");
  const [poste, setposte] = useState({});
  const p = isDarkMode.isDarkMode;
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/user/${userId}`)
      .then((response) => {
        const userData = response.data;
        console.log("user data",userData);
        setData(userData);
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
  console.log("post", poste);

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
            <Ads uri="https://electro.madrasthemes.com/wp-content/uploads/2019/04/footer-widget-img-01.jpg" />
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
