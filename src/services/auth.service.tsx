// src/services/auth.service.ts
import axiosInstance from "./axiosInstance";
import { VITE_ML_URL } from "../config";
import { SignupForm, LoginResponse } from "../types/types";
import axios from "axios";

/**
 * Extract text from an image via ML API
 */
export const extractTextFromImage = async (imageUrl: string): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append("image_path", imageUrl);

    const response = await axios.post(`${VITE_ML_URL}/extract`, formData); // ML API is separate
    console.log("Extracted text:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to extract text from image", error);
    return null;
  }
};

/**
 * Request OTP for given email
 */
export const getOtp = async (email: string): Promise<any> => {
  try {
    const response = await axiosInstance.post("/api/send-otp", { to: email });
    return response.data;
  } catch (error) {
    console.error("Failed to get OTP", error);
    return null;
  }
};

/**
 * Register a new student
 */
export const registerUser = async (formData: SignupForm, idPhoto: string): Promise<any> => {
  try {
    const jsonData = {
      registrationNo: formData.registrationNumber,
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      department: formData.branch,
      idPhoto, // base64 string or URL
      dob: formData.dateOfBirth,
    };

    console.log("Request JSON:", jsonData);

    const response = await axiosInstance.post("/api/students", jsonData);
    console.log("Account created:", response.data);

    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
      console.log("JWT Token saved to localStorage");
    }

    return response.data;
  } catch (error) {
    console.error("Failed to create account", error);
    return null;
  }
};

/**
 * Login a user and return typed response
 */
export const loginUser = async (
  email: string,
  password: string,
  role: string
): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>(`/api/${role}/login`, {
      email,
      password,
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  } catch (error: any) {
    console.error("Failed to login", error);
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

/**
 * Get currently logged-in student
 */
export const getLoginUser = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get("/api/students/me");
    return response.data;
  } catch (error) {
    console.error("Failed to get user", error);
    return null;
  }
};
