const baseURL = import.meta.env.VITE_BASE_URL;
import axios from "axios";

export const createPost = async (fd) => {
  return axios.post(`${baseURL}/post/create`, fd);
};

export const getPost = async (id) => {
  return axios.get(`${baseURL}/post/${id}`);
};

export const getPosts = async (page, searchText) => {
  const config = {
    params: {
      page,
    },
  };
  if (searchText) {
    config.params.searchTerm = searchText;
  }
  return axios.get(`${baseURL}/post`, config);
};

export const getPostsByCategory = async (categoryId, page, searchText) => {
  const config = {
    params: {
      page,
    },
  };
  if (searchText) {
    config.params.searchTerm = searchText;
  }
  return axios.get(`${baseURL}/post/category/${categoryId}`, config);
};

export const getPostsBySubcategory = async (
  subcategoryId,
  page,
  searchText
) => {
  const config = {
    params: {
      page,
    },
  };
  if (searchText) {
    config.params.searchTerm = searchText;
  }
  return axios.get(`${baseURL}/post/subcategory/${subcategoryId}`, config);
};
export const getPostsBycategoryCount = async () => {
  return axios.get(`${baseURL}/post/category/count`);
};
export const getArchive = async () => {
  return axios.post(`${baseURL}/post/archive`);
};
