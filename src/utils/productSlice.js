import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    productList: null,
  },
  reducers: {
    addtoProductList: (state, action) => {
      state.productList = action.payload;
    },
  },
});

export const { addtoProductList } = productSlice.actions;

export default productSlice.reducer;
