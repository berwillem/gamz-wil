const baseURL = import.meta.env.VITE_BASE_URL;
import axios from "axios";

export const passwordReset = async (token, userId, password) => {
  return axios.post(
    baseURL + `/auth/reset-password?token=${token}&id=${userId}`,
    { password }
  );
}

export const registerRequest = async (userData) => {
  return axios.post(`${baseURL}/auth/register`, userData);
}

export const loginRequestService = async (userData) => {
  return axios.post(`${baseURL}/auth/signin`, userData);
}

export const confirmEmailRequest = async (userId, otp) => {
  return axios.post(`${baseURL}/auth/verify-email`, { userId, otp });
}

export const passwordForgot = async (email) => {
  return axios.post(`${baseURL}/auth/forgot-password`, { email });
}