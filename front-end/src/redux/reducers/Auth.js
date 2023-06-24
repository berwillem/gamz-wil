import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const baseURL = import.meta.env.VITE_BASE_URL;


const initialState = {
  isLoading: false,
  user: null,
  isLoggedIn: false,
  error: null,
  
};

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    registrationRequest: (state) => {
      state.isLoading = true;
      state.user = null;
      state.error = null;
    },
    registrationSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    registrationFailure: (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.error = action.payload.response.data.error;
    },
    loginRequest: (state) => {
      state.isLoading = true;
      state.user = null;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.isLoggedIn = true;
      state.error = null;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('isLoggedIn', 'true');
    },
  
    
     logout: (state) => {
      state.isLoading = false;
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;

      localStorage.removeItem('user');
      localStorage.setItem('isLoggedIn', 'false');
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.error = action.payload.response.data.error;
    },
    emailConfirmationRequest: (state) => {
      state.isLoading = true;
      state.user = null;
      state.error = null;
    },
    emailConfirmationSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.error = null;
      localStorage.removeItem('user');
    },
    emailConfirmationFailure: (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.error = action.payload.response.data.error;
    }
  }
});

export const {
  registrationRequest,
  registrationSuccess,
  registrationFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  emailConfirmationRequest,
  emailConfirmationSuccess,
  emailConfirmationFailure,
} = registrationSlice.actions;

export const register = (userData) => async (dispatch) => {
  try {
    dispatch(registrationRequest());
    const response = await axios.post(baseURL+"/auth/register", userData);
    dispatch(registrationSuccess(response.data));
  } catch (error) {
    dispatch(registrationFailure(error));
    throw error
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const response = await axios.post(baseURL+ "/auth/signin", userData);
    console.log("Login Success:", response.data);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure(error));
    throw error
  }
};

export const confirmEmail = (userId, otp) => async (dispatch) => {
  try {
    dispatch(emailConfirmationRequest());
    const response = await axios.post(baseURL + "/auth/verify-email", { userId, otp });
    console.log("Email Confirmation Success:", response.data);
    dispatch(emailConfirmationSuccess(response.data));
  } catch (error) {
    dispatch(emailConfirmationFailure(error));
    throw error;
  }
};

export const selectRegistration = (state) => state.registration;

export default registrationSlice.reducer;