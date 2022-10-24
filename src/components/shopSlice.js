import { createSlice } from "@reduxjs/toolkit";

export const shopSlice = createSlice({
  name: "services",
  initialState: {
    catalog: [],
    searchText: "",
    cart: [],
    totalCost: 0,
    loading: false,
  },
  reducers: {
    addSearchText: (state, { payload }) => {
      state.searchText = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    clearSearchText: (state, { payload }) => {
      state.searchText = "";
    },
    putItemToCart: (state, { payload }) => {
      const duplicate = state.cart.find(el => el.id === payload.id);
      duplicate 
        ? state.cart = state.cart.map(el => (el.id === payload.id) ? ({...el, amount: el.amount + payload.amount}) : el )
        : state.cart.push(payload);
    },
    deleteItemFromCart: (state, { payload }) => {
      state.cart = state.cart.filter(el => el.id !== payload);
    },
    clearCart: (state, { payload }) => {
      state.cart = [];
    },
    getTotalCost: (state, { payload }) => {
      let result = 0;
      state.cart?.forEach(el => result = result + (Number(el.price) * Number(el.amount)));
      state.totalCost = result;
    }
  },
});

export const {
  addSearchText,
  clearSearchText,
  putItemToCart,
  deleteItemFromCart,
  getTotalCost,
  clearCart,
  setLoading,
} = shopSlice.actions;

export default shopSlice.reducer;
