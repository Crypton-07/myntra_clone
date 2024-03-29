import { createSlice } from "@reduxjs/toolkit";

const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    banner: null,
  },
  reducers: {
    addToBanner: (state, action) => {
      state.banner = action.payload;
    },
  },
});
export const { addToBanner } = bannerSlice.actions;
export default bannerSlice.reducer;
