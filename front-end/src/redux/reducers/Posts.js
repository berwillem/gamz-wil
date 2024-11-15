import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  posts:[],
  post: null,
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    GetAllPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
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

export const { createPostStart, GetAllPosts,createPostSuccess, createPostFailure } = postSlice.actions;

export const createPost = (postData) => async (dispatch) => {
  try {
    dispatch(createPostStart());
    //TODO: test it
    const response = await axios.post(baseURL+'/post/create', postData);
    dispatch(createPostSuccess(response.data));
  } catch (error) {
    dispatch(createPostFailure(error.message));
  }
};

export default postSlice.reducer;