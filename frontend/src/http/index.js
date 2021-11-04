import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  //   baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

// List of all the end points
export const register = (data) => api.post("/api/register", data);
export const sendOTP = (data) => api.post("/api/send-otp", data);
export const verifyOTP = (data) => api.post("/api/verify-otp", data);
export default api;
