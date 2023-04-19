import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/Auth';
import passReducer from './reducers/Pass';
import postsReducer from "./reducers/Posts"
const store = configureStore({
  reducer: {
    auth:authReducer,
    pass:passReducer,
    posts:postsReducer,
  }
});
export default store;