import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/Auth';
import passReducer from './reducers/Pass';
import postsReducer from "./reducers/Posts"
import userReducer from "./reducers/users"
import filterSlice from "./reducers/filters"
import LightSlice from './reducers/LightSlice';
const store = configureStore({
  reducer: {
    auth:authReducer,
    pass:passReducer,
    posts:postsReducer,
    user:userReducer,
    filters: filterSlice,
    light:LightSlice,
  }
});
export default store;