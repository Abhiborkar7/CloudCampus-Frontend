// src/services/axiosInstance.ts
import axios, { AxiosError, AxiosResponse } from "axios";
import { VITE_BASE_URL } from "../config";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: VITE_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // needed for sending cookies
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      // Optionally ignore 401 to prevent unwanted toasts on login page
      if (error.response.status !== 401) {
        toast.error((error.response.data as any)?.message || "Something went wrong");
      }
    } else if (error.request) {
      toast.error("No response from server");
    } else {
      toast.error(error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
