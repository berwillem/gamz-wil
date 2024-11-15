import { useEffect, useState } from "react";
import { BsDiscord, BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import Logo from "../../assets/1.webp";
import Logo2 from "../../assets/2.webp";
import "./Footer.css";
import { Link } from "react-router-dom";
import pdf1 from "../../assets/pdf/Conditions d'utilisation .pdf";
import pdf2 from "../../assets/pdf/Politique de confidentialité .pdf";
import { useSelector } from "react-redux";
import { getCategories } from "../../services/Category";

function Footer({  onCategoryChange }) {
  //state
  const light = useSelector((state) => state.light.value);
  const [categories, setCategories] = useState([]);
  // function Categorys id
  const handleCategorySelection = (categoryId) => {
    onCategoryChange(categoryId);
  };
  // function scroll on click
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 400,
      behavior: "smooth",
    });
  };

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const fetchedCategories = await getCategories()
        setCategories(fetchedCategories.data);
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
            <img src={light ? Logo2 : Logo} alt="" />
          </div>
          <div className="social-media">
            <a
              href="https://www.instagram.com/gamz.dz/?igshid=ZDdkNTZiNTM%3D"
              target="blank"
            >
              <BsInstagram size={20} color="#757575" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100092228414663&mibextid=ZbWKwL"
              target="blank"
            >
              <BsFacebook size={20} color="#757575" />
            </a>
            <a href="https://discord.com/invite/FT42RYENUK" target="blank">
              <BsDiscord size={20} color="#757575" />
            </a>
            <a
              href="https://twitter.com/Gamz_Dz?t=4rVPquN813yhWN7hxb9AxQ&s=09"
              target="blank"
            >
              <BsTwitter size={20} color="#757575" />
            </a>
          </div>
        </div>
        <div className="categories">
          <div className="title-category">
            <strong>Categories</strong>
          </div>
          <div className="category-list">
            {categories.map((categorie, index) => (
              <li
                key={index}
                onClick={() => {
                  handleCategorySelection(categorie._id);
                  handleScrollToTop();
                }}
              >
                {categorie.name}
              </li>
            ))}
          </div>
        </div>
        <div className="R-footer">
          <Link to="/contact" className="sp-li">
            <li>Contact</li>
          </Link>
          <a href={pdf1} target="_blank">
            <li className="sp-li">Conditions d'utilisation</li>
          </a>
          <a href={pdf2} target="_blank">
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
