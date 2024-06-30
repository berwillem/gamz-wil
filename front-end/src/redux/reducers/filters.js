import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: null,
  subcategory: null,
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload
    },
    setSubCategory: (state, action) => {
      state.subcategory = action.payload
    },
    setFilters: (state, action) => {
      state.category = action.payload.category
      state.subcategory = action.payload.subcategory
    },
    clearFilters: (state, action) => {
      state.category = null
      state.subcategory = null
    }
  },
});

export const { setCategory, setSubCategory, setFilters, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
