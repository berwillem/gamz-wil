const baseURL = import.meta.env.VITE_BASE_URL;
import axios from "axios";

export const getSubcategories = (categoryId) => {
  return axios.get(`${baseURL}/subcategories/${categoryId}`);
}

export const getCategories = () => {
  return axios.get(`${baseURL}/category`)
}