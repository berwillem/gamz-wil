import { createSlice } from "@reduxjs/toolkit";
export const baseUrl = "http://localhost:5000/api/v1/user";

const initialState = {
  user: [],
};

export const UsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    GetAllUsers: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export const { GetAllUsers } = UsersSlice.actions;


export default UsersSlice.reducer;
