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
import subSubSubCategoryes from "../../Data/subSubSubCategory";
import subSubSubSubCategoryes from "../../Data/subSubSubSubCategory";
import axios from "axios";

function CategorySide(props) {
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

  const handleCategoryClick = (categoryId) => {
    props.handleProductFetch(categoryId);
  };

  return (
    <div className="category-side-container">
      <div className="category-side-title">
        <h4>Categories</h4>
      </div>
      <div className="category-side">
        {subcategoryes.map((subcategorye) => {
          const subSubCategories = subSubCategoryes.filter(
            (subSubCategory) => subSubCategory.parentCategoryId === subcategorye.id
          );

          if (subSubCategories.length > 0) {
            return (
              <li key={subcategorye.id}>
                <p onClick={() => handleCategoryClick(subcategorye.id)}>
                  {subcategorye.label}
                </p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                </svg>
                <div className="hover-drop-down">
                  {subSubCategories.map((subSubCategory) => {
                    const subSubSubCategories = subSubSubCategoryes.filter(
                      (subSubSubCategory) =>
                        subSubSubCategory.parentCategoryId === subSubCategory.id
                    );

                    return (
                      <ul key={subSubCategory.id}>
                        <li
                          className="drop-down-titel"
                          onClick={() => handleCategoryClick(subSubCategory.id)}
                        >
                          {subSubCategory.label}
                        </li>
                        <div>
                          {subSubSubCategories.map((subSubSubCategory) => {
                            const subSubSubSubCategories = subSubSubSubCategoryes.filter(
                              (subSubSubSubCategory) =>
                                subSubSubSubCategory.parentCategoryId === subSubSubCategory.id
                            );

                            return (
                              <li key={subSubSubCategory.id}  onClick={() => handleCategoryClick(subSubCategory.id)}>
                                {subSubSubCategory.label}
                              
                              </li>
                            );
                          })}
                        </div>
                      </ul>
                    );
                  })}
                </div>
              </li>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}

export default CategorySide;
