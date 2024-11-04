import { createSlice } from "@reduxjs/toolkit";
import { isSessionExpired } from "./sessionUtils";
const initialState = {
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateuser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      // set expiration time for 1 day
      const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours
      localStorage.setItem("expirationTime", expirationTime);
    },
    userlogoutReducer: (state) => {
      state.user = false;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("expirationTime");
    },
  },
});

if (isSessionExpired()) {
  userSlice.caseReducers.userlogoutReducer(initialState);
}

export const { userlogoutReducer, updateuser } = userSlice.actions;

export default userSlice.reducer;
