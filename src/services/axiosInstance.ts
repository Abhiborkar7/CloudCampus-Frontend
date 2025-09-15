// src/services/axiosInstance.ts
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { VITE_BASE_URL } from "../config";

import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: VITE_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");

    // Make sure headers exist
    config.headers = config.headers ?? {};

    // AxiosHeaders or plain object
    if ("set" in config.headers) {
      config.headers.set("Authorization", `Bearer ${token}`);
    } else {
      (config.headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// // Response interceptor
// axiosInstance.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   (error: AxiosError) => {
//     if (error.response) {
//       toast.error((error.response.data as any)?.message || "Something went wrong");
//     } else if (error.request) {
//       toast.error("No response from server");
//     } else {
//       toast.error(error.message);
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
