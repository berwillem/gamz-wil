import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  value: true,
};

const lightSlice = createSlice({
  name: 'light',
  initialState,
  reducers: {
    toggleLight: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggleLight } = lightSlice.actions;
export default lightSlice.reducer;
