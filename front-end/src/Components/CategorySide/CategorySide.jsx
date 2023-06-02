import React, { useEffect, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import CatHover from "../CatHover/CatHover";
import "./CategorySide.css";
import cat_img from "../../assets/images/PICS/img1.png";
import cat_img2 from "../../assets/images/PICS/img2.png";
import cat_img3 from "../../assets/images/PICS/img3.png";
import cat_img4 from "../../assets/images/PICS/img4.png";
import cat_img5 from "../../assets/images/PICS/img5.png";
import { fetchCategories, getCategories } from "../../Data/category";
import subcategoryes from "../../Data/subCategory";
import subSubCategoryes from "../../Data/subSubCategory";
import axios from "axios";

function CategorySide(props) {
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
  const handleCategoryClick = (categoryId) => {
    props.handleProductFetch(categoryId);
  };
  return (
    <div className="category-side-container">
      <div className="category-side-title">
        <h4>Categories</h4>
      </div>
      <div className="category-side">
        {categories.map((categorie) => (
          <li key={categorie.name}>
            <p onClick={() => handleCategoryClick(categorie._id)}>
              {categorie.name}
            </p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
            </svg>
            <div className="hover-drop-down ">
              {subcategoryes.map((subcategorye) => {
                if (subcategorye.parentCategoryId === categorie._id) {
                  return (
                    <ul key={subcategorye.id}>
                      <li
                        className="drop-down-titel"
                        onClick={() => handleCategoryClick(subcategorye.id)}
                      >
                        {subcategorye.label}{" "}
                      </li>
                      <div>
                        {subSubCategoryes.map((subcategorye2, index) => {
                          if (
                            subcategorye2.parentCategoryId === subcategorye.id
                          ) {
                            return (
                              <li
                                key={index}
                                onClick={() =>
                                  handleCategoryClick(subcategorye2.id)
                                }
                              >
                                {subcategorye2.label}
                              </li>
                            );
                          }
                        })}
                      </div>
                    </ul>
                  );
                }
              })}

              {/* <img className="img-cat" src={categorye.image} alt="cat_img" /> */}
            </div>
          </li>
        ))}
      </div>
    </div>
  );
}

export default CategorySide;
