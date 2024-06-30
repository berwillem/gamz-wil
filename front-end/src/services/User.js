const baseURL = import.meta.env.VITE_BASE_URL;
import axios from "axios";

export const updateUser = async (fd) => {
  return axios.put(`${baseURL}/user/update`, fd);
};

export const getUsers = async (sessionId) => {
  return axios.get(`${baseURL}/user`, { headers: { "session-id": sessionId } });
};
