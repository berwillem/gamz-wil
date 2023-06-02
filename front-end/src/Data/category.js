import cat_img from "../assets/images/PICS/img1.png";
import cat_img2 from "../assets/images/PICS/img2.png";
import cat_img3 from "../assets/images/PICS/img3.png";
import cat_img4 from "../assets/images/PICS/img4.png";
import cat_img5 from "../assets/images/PICS/img5.png";

import axios from 'axios';
const baseURL = import.meta.env.VITE_BASE_URL;

let categories = [];

export const fetchCategories = async () => {
  try {
    const response = await axios.get(baseURL+'/category');
    categories = response.data;
    return categories;
  } catch (error) {
    console.error(error);
    throw error; 
  }
};

export const getCategories = () => {
  return categories;
};
