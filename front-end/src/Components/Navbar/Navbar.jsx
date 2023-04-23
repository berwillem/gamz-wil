import React, { useEffect } from "react";
import "./Navbar.css";
import { BsPlusLg } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { HiSearch } from "react-icons/hi";
import { BsSuitHeart } from "react-icons/bs";
import { HiMenu } from "react-icons/hi";
import logo from "../../assets/1.png";
import logo2 from "../../assets/2.png";
import  UpdateInfo from "../UpdateInfo/UpdateInfo";
import { Link } from "react-router-dom";
import {useState} from 'react';
import  { useRef } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";

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
  const infoupdate = JSON.parse(localStorage.getItem('user'))?.infoUpdate || null;
  const [isActive, setIsActive] = useState(false);
  const [searchActive,setSearchActive] = useState("search");
  function handleSearch() {
   if(searchActive==="search"){
    setSearchActive("search active-search")
   }
   else{
    setSearchActive("search")
   }
  }

 
  function handleClick2(event) {
    const nextElement = event.target.nextElementSibling;
    if (nextElement) {
    
      nextElement.classList.toggle("active-ul");
    }
  }
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };
  useEffect(() => {
    if (menuIsOpen) {
      document.body.classList.add("menu-open", "overlay");
    } else {
      document.body.classList.remove("menu-open", "overlay");
    }
  }, [menuIsOpen]);
  
  
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuIsOpen(false);
       
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navRef]);
  
  const handleMenuScroll = (e) => {
    e.stopPropagation();
  };
  
  const searchBoxRef = useRef(null);
  
  useEffect(() => {
    function handleOutsideClick(event) {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        setSearchActive("search");
      }
    }
    
    document.addEventListener("click", handleOutsideClick);
    
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [searchBoxRef]);
  return (
    <div className="navbar-container">
       {menuIsOpen && <div className="overlay"></div>}
      <div className="navbar-content">
        <div className="navbar-up">
          <div className="welcome-message">
            Welcome to
            <span className="span-message">Gamz</span>
          </div>
          <div className="account-pub">
            <li className="catch-button">
              <BsPlusLg  size={13} />
              <Link to="/createPost">Deposer une annonce</Link>
            </li>
            <li className="upline">|</li>
            <li>
              {isLoggedIn ? (
                <div>
                  <Link to={"/account"}>
                    <CiUser  size={20} />
                    {username}
                  </Link>
                </div>
              ) : (
                <Link to={"/account"}>
                  <CiUser  size={20} />
                  {isLoggedIn ? username : "Account"}
                </Link>
              )}
            </li>
          </div>
        </div>
        {isLoggedIn ? infoupdate ? <div></div> : <UpdateInfo /> : <div></div>}

        <div className="navbar-center">
        <div className="menu-logo">
          <div className={`menu ${menuIsOpen ? "open" : ""}`} ref={navRef}  onScroll={handleMenuScroll}>
           <ul className="ul" >
           <Link to="/contact"> <li className="li-hover" >
           Contact
           </li></Link>
          
            
            <ul className="ul2">
                <li>jdj</li>
                <li>d,dk</li>
                <li>dkk</li>
              </ul>
            <li onClick={handleClick2} >	Informatique 
            <AiFillCaretDown/>
            </li>
            <ul className="ul2">
                <li>PC Portable/ LAPTOB</li>
                <li>PC Bureau </li>
                <li>CONNECTIQUE/PERIPHERIQUES </li>
              </ul>
            <li onClick={handleClick2} >Console
            <AiFillCaretDown/>
            </li>
            <ul className="ul2">
                <li>Sony / Playstation</li>
                <li>Microsoft / Xbox</li>
                <li>	Nintendo</li>
                <li>	Steam Desk</li>
                <li>Consoles Retro </li>
              </ul>
            <li onClick={handleClick2} >Jeux videos
            <AiFillCaretDown/>
            </li>
            <ul className="ul2">
                <li>	Jeux Vidéos physique Ps</li>
                <li>Jeux Vidéos physique Xbox </li>
                <li>Packs Collectors</li>
                <li>Produit Dérivés </li>
              </ul>
            <li onClick={handleClick2} >	Contenu Digital 
            <AiFillCaretDown/>
            </li>
            <ul className="ul2">
                <li>Jeux Vidéos </li>
                <li>Abonnements</li>
                <li>Comptes </li>
                <li>	Gift Card  </li>
              </ul>
         
            <li  onClick={handleClick2} >Téléphonie 
            <AiFillCaretDown/>
             
            </li>
            <ul className="ul2">
                <li>Marques </li>
                <li>Objets Connectés </li>
                <li>Accessoires Téléphonie</li>
              </ul>
           
          
           </ul>
          </div>
        <HiMenu size={25} onClick={toggleMenu}  />
          <div className="logo" >
           <Link to="/"> <img src={p ? logo2 : logo} alt="" className="logo-gamz" /></Link>
          </div>
          </div>
          <div className="search-left">
            <div className="searchBar " ref={searchBoxRef }>
              <input type="text" placeholder="Search here" className={searchActive}  />
              <div style={{ display: "flex" }}>
                <select id="select">
                  {category.map((i) => (
                    <option value={i.value}>{i.label}</option>
                  ))}{" "}
                </select>
                <div className="search-icon" onClick={handleSearch}ref={searchBoxRef } >
                  <HiSearch size={25} />
                </div>
              </div>
            </div>

            <div className="icons">
              <li>
                <BsSuitHeart size={20} />
              </li>
              <li>
                <CiUser  size={20} />
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
