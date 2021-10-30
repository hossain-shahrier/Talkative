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
export const sendOTP = (data) => api.post("/api/send-otp", data);
export default api;
