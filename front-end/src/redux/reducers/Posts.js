import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  post: null,
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    createPostStart(state) {
      state.loading = true;
      state.error = null;
    },
    createPostSuccess(state, action) {
      state.loading = false;
      state.post = action.payload;
    },
    createPostFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { createPostStart, createPostSuccess, createPostFailure } = postSlice.actions;

export const createPost = (postData) => async (dispatch) => {
  try {
    dispatch(createPostStart());
    const response = await axios.post('http://localhost:5000/api/v1/post/create', postData);
    dispatch(createPostSuccess(response.data));
  } catch (error) {
    dispatch(createPostFailure(error.message));
  }
};

export default postSlice.reducer;