const baseURL = import.meta.env.VITE_BASE_URL;
import axios from "axios";

export const createPost = async (fd) => {
  return axios.post(`${baseURL}/post/create`, fd);
};

export const getPost = async (id) => {
  return axios.get(`${baseURL}/post/${id}`);
};

export const getPosts = async () => {
  return axios.get(`${baseURL}/post`);
};

export const getPostsByCategory = async (categoryId) => {
  return axios.get(`${baseURL}/post/category/${categoryId}`);
};

export const getPostsBySubcategory = async (subcategoryId) => {
  return axios.get(`${baseURL}/post/subcategory/${subcategoryId}`);
};
export const getPostsBycategoryCount = async () => {
  return axios.get(`${baseURL}/post/category/count`);
};
export const getArchive = async () => {
  return axios.post(`${baseURL}/post/archive`);
};
