const baseURL = import.meta.env.VITE_BASE_URL;
import axios from "axios";

export const createPost = async (fd) => {
  return axios.post(`${baseURL}/post/create`, fd);
};

export const getPost = async (id) => {
  return axios.get(`${baseURL}/post/${id}`);
};

export const getPosts = async (page) => {
  return axios.get(`${baseURL}/post`, { params: { page } });
};

export const getPostsByCategory = async (categoryId, page) => {
  return axios.get(`${baseURL}/post/category/${categoryId}`, { params: { page } });
};

export const getPostsBySubcategory = async (subcategoryId, page) => {
  return axios.get(`${baseURL}/post/subcategory/${subcategoryId}`, { params: { page } });
};
export const getPostsBycategoryCount = async () => {
  return axios.get(`${baseURL}/post/category/count`);
};
