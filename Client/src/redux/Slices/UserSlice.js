import { createSlice } from "@reduxjs/toolkit";

// User slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: false,
  },
  reducers: {
    updateuser: (state, action) => {
      state.user = action.payload;
    },
    userlogoutReducer: (state) => {
      state.user = false;
    },
  },
});
export const {
  userlogoutReducer,
  updateuser,
  loginUser,
  reduceQuantity,
  removefromcart,
  addtocart,
} = userSlice.actions;

export default userSlice.reducer;
