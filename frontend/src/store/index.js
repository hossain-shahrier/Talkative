import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import user from "./userSlice";
export default configureStore({
  reducer: {
    auth,
    user,
  },
});
