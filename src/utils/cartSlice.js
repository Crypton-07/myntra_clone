import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    wishlistItem: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
    },
    addToWishlist: (state, action) => {
      state.wishlistItem.push(action.payload);
    },
    removeFromWishlist: (state, action) => {
      state.wishlistItem.pop(action.payload);
    },
  },
});

export const { addToCart, addToWishlist ,removeFromWishlist } = cartSlice.actions;
export default cartSlice.reducer;
