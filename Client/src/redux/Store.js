import { configureStore } from "@reduxjs/toolkit";
import ProductsSlice from "./Slices/ProductsSlice";
import userSlice from "./Slices/UserSlice";


export const store = configureStore({
  reducer: {
    products: ProductsSlice,
    user: userSlice,
  },
});