

import axios from 'axios';
const baseURL = import.meta.env.VITE_BASE_URL;

let categories = [];

export const fetchCategories = async () => {
  try {
    //TODO: test it
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
