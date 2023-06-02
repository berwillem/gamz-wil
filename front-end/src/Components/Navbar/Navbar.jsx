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
// import categoryes from "../../Data/category";
import subCategoryes from "../../Data/subCategory";
import axios from "axios";
import { fetchCategories, getCategories } from "../../Data/category";
const baseURL = import.meta.env.VITE_BASE_URL;



function Navbar({ p, handleProductFetch }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const username = JSON.parse(localStorage.getItem("user"))?.username || null;
  const userId = JSON.parse(localStorage.getItem("user"))?.id || null;
  const infoupdate =
    JSON.parse(localStorage.getItem("user"))?.infoUpdate || null;
  const [searchActive, setSearchActive] = useState("search");

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
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCategories();
        const fetchedCategories = getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
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
        setSearchText("");
        setResults([]);
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
  const [results, setResults] = useState([]);

  const fetchData = (value) => {
    axios
      .get(baseURL+"/post/")
      .then((response) => {
        const results = response.data.filter((post) =>
          post.title.toLowerCase().includes(value.toLowerCase())
        );
        setResults(results);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData(searchText);
  }, [searchText]);
  const handleChange = (event) => {
    setSearchText(event.target.value);
    fetchData(event.target.value);
  };
  const filterResultsByCategory = (category) => {
    if (category === "") {
      return results;
    } else {
      return results.filter((result) => {
        return result.category === category;
      });
    }
  };

  //* function

  const handleSearch = () => {
    setSearchText(
      searchBoxRef.current.querySelector('input[type="text"]').value
    );
    if (searchActive === "search") {
      setSearchActive("search active-search");
    } else {
      setSearchActive("search");
    }
    setSearchCategory(searchBoxRef.current.querySelector("select").value);
  };

  // const filteredPosts = posts.filter((item) => {
  //   return (
  //     item.name.toLowerCase().includes(searchText.toLowerCase()) &&
  //     item.category.toLowerCase() === searchCategory.toLowerCase()
  //   );
  // });
  const handleCategoryClick = (categoryId) => {
    handleProductFetch(categoryId);
  };
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
                    <Link to={`/account/${userId}`}>
                      <CiUser size={20} /> {username}{" "}
                    </Link>
                  </div>
                ) : (
                  <Link to={`/account/${userId}`}>
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
                  <Link to="/Account">
                    {" "}
                    <li className="li-hover">Account</li>
                  </Link>
                  <Link to="/createPost">
                    <li className="li-hover plus-annonce">
                      <BsPlusLg size={13} />
                      Deposer une annonce
                    </li>
                  </Link>
                  {categories.map((categorie, index) => (
                    <div key={index}>
                      <li
                        onClick={() => {
                          handleClick2(event);
                          handleCategoryClick(categorie._id);
                        }}
                      >
                        {categorie.name} <AiFillCaretDown />
                      </li>
                      <ul className="ul2">
                        {subCategoryes.map((subcategorye, index) => {
                          if (
                            subcategorye.parentCategoryId === categorie._id
                          ) {
                            return (
                              <li
                                key={index}
                                onClick={() =>
                                  handleCategoryClick(subcategorye.id)
                                }
                              >
                                {subcategorye.label}
                              </li>
                            );
                          }
                        })}{" "}
                      </ul>
                    </div>
                  ))}

                  <Link to="/contact">
                    {" "}
                    <li className="li-hover">Contact</li>
                  </Link>
                </ul>
              </div>
              <HiMenu size={25} onClick={toggleMenu} />
              <div className="logo">
                <Link to="/">
                  <img src={p ? logo2 : logo} alt="" className="logo-gamz-nav" />
                </Link>
              </div>
            </div>
            <div className="search-left">
              <div className="searchBar " ref={searchBoxRef}>
                <input
                  type="text"
                  placeholder="Search here"
                  className={searchActive}
                  value={searchText}
                  name="searchText"
                  autocomplete="off"
                  onChange={handleChange}
                />
                <div className="results-list">
                  {searchText !== "" &&
                    filterResultsByCategory(searchCategory).map((result) => (
                      <Link to={`/postDetails/${result._id}`}>
                        <li key={result._id}>{result.title}</li>
                      </Link>
                    ))}
                </div>
                <div style={{ display: "flex" }}>
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
                <Link to="/createPost">
                  {" "}
                  <BsPlusLg size={13} />
                </Link>
              </li>
             
            </div>
          </div>
          <div className="navbarDown">
            <div className="down">
              {categories.map((categorie, index) => (
                <div className="catnav">
                  <li
                    key={index}
                    onClick={() => handleCategoryClick(categorie._id)}
                  >
                    {categorie.name}
                  </li>
                  <ul className="subNav">
                    {subCategoryes.map((subcategorye, index) => {
                      if (subcategorye.parentCategoryId === categorie._id) {
                        return (
                          <li
                            key={index}
                            onClick={() => handleCategoryClick(subcategorye.id)}
                          >
                            {subcategorye.label}
                          </li>
                        );
                      }
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Navbar;
