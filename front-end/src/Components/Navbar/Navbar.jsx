import React, { useEffect } from "react";
import "./Navbar.css";
import { BsPlusLg } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { HiSearch } from "react-icons/hi";
import { BsSuitHeart } from "react-icons/bs";
import logo from "../../assets/1.png";
import logo2 from "../../assets/2.png";
import  UpdateInfo from "../UpdateInfo/UpdateInfo";
import { Link } from "react-router-dom";

const category = [
  {
    label: "All category",
    value: "",
  },
  {
    label: "Informatiques",
    value: "informatiques",
  },
  {
    label: "Consols",
    value: "Consols",
  },
  {
    label: "Jeux video",
    value: "Jeux video",
  },
  {
    label: "Contenu digital ",
    value: "Contenu digital ",
  },
  {
    label: "Télephonie ",
    value: "Télephonie ",
  },
];
function Navbar({p}) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const username = JSON.parse(localStorage.getItem('user'))?.username || null;
  const infoupdate = JSON.parse(localStorage.getItem('user'))?.infoupdate || null;
  return (
    <div className="navbar-container">
      <div className="navbar-content">
        <div className="navbar-up">
          <div className="welcome-message">
            Welcome to
            <span className="span-message">Gamz</span>
          </div>
          <div className="account-pub">
            <li className="catch-button">
              <BsPlusLg color="#000" size={13} />
              <Link to="/createPost">Deposer une annonce</Link>
            </li>
            <li className="upline">|</li>
            <li>
              {isLoggedIn ? (
                <div>
                  <Link to={"/account"}>
                    <CiUser color="#000" size={20} />
                    {username}
                  </Link>
                </div>
              ) : (
                <Link to={"/account"}>
                  <CiUser color="#000" size={20} />
                  {isLoggedIn ? username : "Account"}
                </Link>
              )}
            </li>
          </div>
        </div>
        {isLoggedIn ? infoupdate ? <div></div> : <UpdateInfo /> : <div></div>}

        <div className="navbar-center">
          <div className="logo">
           <Link to="/"> <img src={p ? logo2 : logo} alt="" className="logo-gamz" /></Link>
          </div>
          <div className="search-left">
            <div className="searchBar">
              <input type="text" placeholder="Search here" className="search" />
              <div style={{ display: "flex" }}>
                <select id="select">
                  {category.map((i) => (
                    <option value={i.value}>{i.label}</option>
                  ))}{" "}
                </select>
                <div className="search-icon">
                  <HiSearch size={25} />
                </div>
              </div>
            </div>

            <div className="icons">
              <li>
                <BsSuitHeart size={20} />
              </li>
              <li>
                <CiUser color="#000" size={20} />
              </li>
            </div>
          </div>
        </div>
        <div className="navbarDown">
          <div className="down">
            <li>Informatique</li>
            <li>Consoles</li>
            <li>Jeux Vidéos</li>
            <li>Contenu Digital</li>
            <li>Télephonie</li>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
