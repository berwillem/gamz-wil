import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: null,
  subcategory: null,
  search: null,
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
    setSearch: (state, action) => {
      state.search = action.payload
    },
    setFilters: (state, action) => {
      state.category = action.payload.category
      state.subcategory = action.payload.subcategory
    },
    clearFilters: (state, action) => {
      state.category = null
      state.subcategory = null
      state.search = null
    }
  },
});

export const { setCategory, setSubCategory, setFilters, clearFilters, setSearch } = filtersSlice.actions;
export default filtersSlice.reducer;
