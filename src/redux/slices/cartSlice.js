import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum;
      }, 0);
    },

    minusItem(state, action) {
      const findItem = state.items.find((item) => item.id === action.payload);
      if (findItem.count > 0) {
        findItem.count--;
        state.totalPrice -= findItem.price;
      } else {
        findItem.count = 0;
      }
    },

    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});
export const selectCart = (state) => state.cartSlice;
export const selectCartItemById = (id) => (state) =>
  state.cartSlice.items.find((item) => item.id === id);
export const { addItem, plusItem, minusItem, removeItem, clearItems } =
  cartSlice.actions;
export default cartSlice.reducer;
