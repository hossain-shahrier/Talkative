import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isRegistered: false,
    isAuth: false,
    user: null,
    otp: {
      username:"",
      password:"",
      email:"",
      phone: "",
      hash: "",
    },
  },
  reducers: {
    setAuth: (state, action) => {
      //
    },
    setOTP: (state, action) => {
      //
      const { username,password,email,phone, hash } = action.payload;
      state.otp.username = username;
      state.otp.password = password;
      state.otp.email = email;
      state.otp.phone = phone;
      state.otp.hash = hash;
    },
  },
});

export const { setAuth, setOTP } = authSlice.actions;

export default authSlice.reducer;
