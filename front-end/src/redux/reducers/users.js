import { createSlice } from "@reduxjs/toolkit";


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
