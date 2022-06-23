import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { sortBy, orderValue, category, search, currentPage } = params;
    const { data } = await axios.get(
      `https://628faa07dc4785236544b57d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${orderValue}${search}`
    );
    return data;
  }
);
const initialState = {
  items: [],
  status: "",
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = "error";
      state.items = [];
    },
  },
});
export const selectPizzas = (state) => state.pizzaSlice;
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
