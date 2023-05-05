import React, { useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import CatHover from "../CatHover/CatHover";
import "./CategorySide.css";
import cat_img from "../../assets/images/PICS/img1.png";
import cat_img2 from "../../assets/images/PICS/img2.png";
import cat_img3 from "../../assets/images/PICS/img3.png";
import cat_img4 from "../../assets/images/PICS/img4.png";
import cat_img5 from "../../assets/images/PICS/img5.png";
import categoryes from "../../Data/category";
import subcategoryes from "../../Data/subCategory";
import subSubCategoryes from "../../Data/subSubCategory";

const Categoryes = [
  {
    id: 1,
    name: "informatique",
  },
  {
    id: 2,
    name: "Consoles",
  },
  {
    id: 3,
    name: "jeux video",
  },
  {
    id: 4,
    name: "Contenu Digital",
  },
  {
    id: 5,
    name: "Télephonie",
  },
];

function CategorySide() {
  const [style, setStyle] = useState("cat-hoverContainer");

  return (
    <div className="category-side-container">
      <div className="category-side-title">
        <h4>Categories</h4>
      </div>
      <div className="category-side">
        {categoryes.map((categorye) => (
          <li key={categorye.value}>
            <p>{categorye.label}</p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
            </svg>
            <div className="hover-drop-down ">
              {subcategoryes.map((subcategorye) => {
                if (subcategorye.parentCategoryId === categorye.value) {
                  return (
                    <ul key={subcategorye.id}>
                      <li className="drop-down-titel">{subcategorye.label} </li>
                    <div>
                    {subSubCategoryes.map((subcategorye2) => {
                        if (
                          subcategorye2.parentCategoryId === subcategorye.id
                        ) {
                          return <li>{subcategorye2.label}</li>;
                        }
                      })}
                    </div>
                    </ul>
                  );
                }
              })}

              <img className="img-cat" src={categorye.image} alt="cat_img" />
            </div>
          </li>
        ))}
      </div>
    </div>
  );
}

export default CategorySide;
