import { createSlice } from "@reduxjs/toolkit";

export const shopSlice = createSlice({
  name: "services",
  initialState: {
    catalog: [],
    searchText: "",
  },
  reducers: {
    addSearchText: (state, { payload }) => {
        state.searchText = payload;
    },
    clearSearchText: (state, { payload }) => {
        state.searchText = "";
    },
  }

});

export const { addSearchText, clearSearchText } = shopSlice.actions;

export default shopSlice.reducer;