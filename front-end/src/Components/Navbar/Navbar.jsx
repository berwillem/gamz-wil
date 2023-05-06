import React, { useEffect } from "react";
import "./Navbar.css";
import { BsPlusLg } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { HiSearch } from "react-icons/hi";
import { BsSuitHeart } from "react-icons/bs";
import { HiMenu } from "react-icons/hi";
import logo from "../../assets/1.png";
import logo2 from "../../assets/2.png";
import UpdateInfo from "../UpdateInfo/UpdateInfo";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretUp } from "react-icons/ai";
import { useSelector } from "react-redux";
import categoryes from "../../Data/category";
import subCategoryes from "../../Data/subCategory";
// import posts from "../../redux/reducers/Posts";

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
function Navbar({ p }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const username = JSON.parse(localStorage.getItem("user"))?.username || null;
  const infoupdate =
    JSON.parse(localStorage.getItem("user"))?.infoUpdate || null;
  const [isActive, setIsActive] = useState(false);
  const [searchActive, setSearchActive] = useState("search");
  // const posts = useSelector((state) => state.post.posts);

  // function handleSearch() {
  //     if (searchActive === "search") {
  //         setSearchActive("search active-search")
  //     } else {
  //         setSearchActive("search")
  //     }
  // }

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
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        setSearchActive("search");
      }
    }

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [searchBoxRef]);

  // search function

  //* state
  const [searchText, setSearchText] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  //* function

  const handleSearch = () => {
    setSearchText(
      searchBoxRef.current.querySelector('input[type="text"]').value
    );
    if(searchActive==="search"){
      setSearchActive("search active-search")
     }
     else{
      setSearchActive("search")
     }
    setSearchCategory(searchBoxRef.current.querySelector("select").value);
  };

  // const filteredPosts = posts.filter((item) => {
  //   return (
  //     item.name.toLowerCase().includes(searchText.toLowerCase()) &&
  //     item.category.toLowerCase() === searchCategory.toLowerCase()
  //   );
  // });

  return (
    <>
      <div className="navbar-container">
        {menuIsOpen && <div className="overlay"></div>}
        <div className="navbar-content">
          <div className="navbar-up">
            <div className="welcome-message">
              Welcome to <span className="span-message">Gamz</span>
            </div>
            <div className="account-pub">
              <li className="catch-button">
                <BsPlusLg size={13} />
                <Link to="/createPost">Deposer une annonce</Link>
              </li>
              <li className="upline">|</li>
              <li>
                {isLoggedIn ? (
                  <div>
                    <Link to={"/account"}>
                      <CiUser size={20} /> {username}{" "}
                    </Link>
                  </div>
                ) : (
                  <Link to={"/account"}>
                    <CiUser size={20} /> {isLoggedIn ? username : "Account"}{" "}
                  </Link>
                )}
              </li>
            </div>
          </div>
          {isLoggedIn ? infoupdate ? <div></div> : <UpdateInfo /> : <div></div>}
          <div className="navbar-center">
            <div className="menu-logo">
              <div
                className={`menu ${menuIsOpen ? "open" : ""}`}
                ref={navRef}
                onScroll={handleMenuScroll}
              >
                <ul className="ul">
                <Link to="/Account"> <li className="li-hover" >
           Account
           </li></Link>
          <Link to="/createPost">
          <li className="li-hover plus-annonce" >
              <BsPlusLg  size={13} />
             Deposer une annonce
            </li>
          </Link>
          {categoryes.map((categorye,index) => (
                        <div key={index}>
                              <li onClick={handleClick2}>
                            {categorye.label} <AiFillCaretDown />
                           
                          </li>
                          <ul className="ul2">
                          {subCategoryes.map((subcategorye,index) => {
                           if (subcategorye.parentCategoryId === categorye.value) {
                            return(
                            <li key={index}>{subcategorye.label}</li>
                         
                         )
                           }
})} </ul>
                          
                        </div>
            ))}
                 
                 
                    <Link to="/contact"> <li className="li-hover" >
              Contact
           </li></Link>
                </ul>
              </div>
              <HiMenu size={25} onClick={toggleMenu} />
              <div className="logo">
                <Link to="/">
                  <img src={p ? logo2 : logo} alt="" className="logo-gamz" />
                </Link>
              </div>
            </div>
            <div className="search-left">
              <div className="searchBar " ref={searchBoxRef}>
                <input
                  type="text"
                  placeholder="Search here"
                  className={searchActive}
                />
                <div style={{ display: "flex" }}>
                  <select id="select">
                    {category.map((i,index) => (
                      <option key={index} value={i.value}>{i.label}</option>
                    ))}{" "}
                  </select>
                  <div
                    ref={searchBoxRef}
                    className="search-icon"
                    onClick={handleSearch}
                  >
                    <HiSearch size={25} />
                  </div>
                </div>
              </div>
              <li className="catch-button">
             
             <Link to="/createPost"> <BsPlusLg  size={13} /></Link>
           </li>
              <div className="icons">
                <li>
                  <BsSuitHeart size={20} />
                </li>
                <li>
                  <CiUser size={20} />
                </li>
              </div>
            </div>
          </div>
          <div className="navbarDown">
            <div className="down">
            {categoryes.map((categorye,index) => (
                            <li key={index}>{categorye.label}</li>
            ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Navbar;
