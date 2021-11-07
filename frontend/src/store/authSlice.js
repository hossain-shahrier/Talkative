import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    isRegistered: false,
    user: {
      username: "",
      password: "",
      email: "",
      phone: "",
    },
    otp: {
      phone: "",
      hash: "",
    },
  },
  reducers: {
    setUser: (state, action) => {
      const { username, password, email, phone } = action.payload;
      state.user.username = username;
      state.user.password = password;
      state.user.email = email;
      state.user.phone = phone;
      state.isRegistered = true;
    },
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
    setPhone: (state, action) => {
      const { phone } = action.payload;
      state.otp.phone = phone;
    },
  },
});

export const { setUser, setAuth, setOTP, setPhone } = authSlice.actions;

export default authSlice.reducer;
