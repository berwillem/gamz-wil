import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = "http://localhost:5000/api/v1/auth";

const initialState = {
  isLoading: false,
  error: null,
  resetLinkSent: false,
};

export const passwordResetSlice = createSlice({
  name: 'passwordReset',
  initialState,
  reducers: {
    sendResetLinkRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.resetLinkSent = false;
    },
    sendResetLinkSuccess: (state) => {
      state.isLoading = false;
      state.error = null;
      state.resetLinkSent = true;
    },
    sendResetLinkFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.resetLinkSent = false;
    },
  }
});

export const {
  sendResetLinkRequest,
  sendResetLinkSuccess,
  sendResetLinkFailure,
} = passwordResetSlice.actions;

export const sendResetLink = (email) => async (dispatch) => {
  try {
    dispatch(sendResetLinkRequest());
    const response = await axios.post(baseUrl + "/forgot-password", { email });
    console.log("Reset link sent successfully:", response.data);
    dispatch(sendResetLinkSuccess());
  } catch (error) {
    dispatch(sendResetLinkFailure(error.response.data.error));
    throw error;
  }
};

export const selectPasswordReset = (state) => state.passwordReset;

export default passwordResetSlice.reducer;
