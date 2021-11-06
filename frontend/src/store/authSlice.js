import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    isRegistered: false,
    user: null,
    otp: {
      phone: "",
      hash: "",
    },
  },
  reducers: {
    setAuth: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      state.isAuth = true;
    },
    setOTP: (state, action) => {
      //
      const { phone, hash } = action.payload;
      state.otp.phone = phone;
      state.otp.hash = hash;
    },
    setPhone: (state) => {
      state.isRegistered = true;
    },
  },
});

export const { setAuth, setOTP, setPhone } = authSlice.actions;

export default authSlice.reducer;
