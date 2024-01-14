import { configureStore } from "@reduxjs/toolkit";
import bannerSlice from "./bannerSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import userSlice from "./userSlice";

const appStore = configureStore({
  reducer: {
    banner: bannerSlice,
    product: productSlice,
    cart: cartSlice,
    user: userSlice,
  },
});

export default appStore;
