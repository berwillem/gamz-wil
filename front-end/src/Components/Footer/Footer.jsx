import React, { useEffect, useState } from "react";
import { BsDiscord, BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import Logo from "../../assets/1.png";
import Logo2 from "../../assets/2.png";
import "./Footer.css";
import { Link } from "react-router-dom";
import pdf1 from "../../assets/pdf/Conditions d'utilisation .pdf";
import pdf2 from "../../assets/pdf/Politique de confidentialité .pdf";
import { fetchCategories, getCategories } from "../../Data/category";

function Footer({ p, handleProductFetch }) {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 400,
      behavior: 'smooth'
    });
  };
  const handleCategoryClick = (categoryId) => {
    handleProductFetch(categoryId);
  };
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCategories();
        const fetchedCategories = getCategories();
        setCategories(fetchedCategories);
        console.log(fetchedCategories);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="L-footer">
          <div className="logo-footer">
            <img src={p ? Logo2 : Logo} alt="" />
          </div>
          <div className="social-media">
            <a href="https://www.instagram.com/gamz.dz/?igshid=ZDdkNTZiNTM%3D" target="blank">
              <BsInstagram size={20} color="#757575" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100092228414663&mibextid=ZbWKwL" target="blank">
              <BsFacebook size={20} color="#757575" />
            </a>
            <a href="https://discord.com/invite/QVMfN2S9qN" target="blank">
              <BsDiscord size={20} color="#757575" />
            </a>
            <a href="https://twitter.com/Gamz_Dz?t=4rVPquN813yhWN7hxb9AxQ&s=09" target="blank">
              <BsTwitter size={20} color="#757575" />
            </a>
          </div>
        </div>
        <div className="categories">
          <div className="title-category">
            <strong>Categories</strong>
          </div>
          <div className="category-list">
          {categories.map((categorie,index) => (
                            <li key={index} onClick={() =>{ handleCategoryClick(categorie._id);; handleScrollToTop();}}>{categorie.name}</li>
            ))}
          </div>
        </div>
        <div className="R-footer">
          <Link to="/contact" className="sp-li">
            <li>Contact</li>
          </Link>
          <a href={pdf1} download>
            <li className="sp-li">Conditions d'utilisation</li>
          </a>
          <a href={pdf2} download>
            <li className="sp-li">Politique de confidentialité </li>
          </a>
        </div>
      </div>
      <div className="copy-right">
        <p>
          {" "}
          @ <strong>Gamz</strong>- All Rights Reserved
        </p>
      </div>
    </div>
  );
}

export default Footer;
