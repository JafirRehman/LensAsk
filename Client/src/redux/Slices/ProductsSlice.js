import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const base_url = import.meta.env.VITE_API_BACKEND_BASE_URL;

export const fetchProducts = createAsyncThunk(
  "fetch/products",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${base_url}/common/getallproducts`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  isLoading: false,
  products: [],
  error: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.data;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.products = [];
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
