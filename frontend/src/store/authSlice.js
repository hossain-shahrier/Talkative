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
    setUser: (state, action) => {
      const data = action.payload;
      state.user = data;
      state.isRegistered = true;
    },

    setAuth: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      if (state.user === null) {
        state.isAuth = false;
      } else {
        state.isAuth = true;
      }
    },
    setOTP: (state, action) => {
      //
      const { hash } = action.payload;
      state.otp.hash = hash;
    },
    setPhone: (state, action) => {
      const { phone } = action.payload;
      state.otp.phone = phone;
    },
  },
});

export const { setUser, setAuth, setOTP, setPhone, setActivation } =
  authSlice.actions;

export default authSlice.reducer;
