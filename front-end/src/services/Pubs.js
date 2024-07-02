const baseURL = import.meta.env.VITE_BASE_URL;
import axios from "axios";

export const createPubMobil = async (formData, sessionId) => {
  return axios.post(baseURL + "/pub/mobil", formData, {
    headers: { "session-id": sessionId },
  });
};

export const createPub = async (formData, sessionId) => {
  return axios.post(baseURL + "/pub", formData, {
    headers: { "session-id": sessionId },
  });
};

export const createSidePub = async (formData, sessionId) => {
  return axios.post(baseURL + "/pub/side", formData, {
    headers: { "session-id": sessionId },
  });
}

export const getSidePub = async (num) => {
  return axios.get(baseURL + `/pub/side/${num}`);
}