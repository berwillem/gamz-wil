import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

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
    const response = await axios.post(baseURL + "/auth/forgot-password", { email });
    dispatch(sendResetLinkSuccess());
  } catch (error) {
    dispatch(sendResetLinkFailure(error.response.data.error));
    throw error;
  }
};

export const selectPasswordReset = (state) => state.passwordReset;

export default passwordResetSlice.reducer;
