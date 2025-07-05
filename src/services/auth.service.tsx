import axios from "axios"
import { VITE_BASE_URL, VITE_ML_URL } from "../main"
import { SignupForm } from "../types/types";
import { Navigate } from "react-router-dom";

export const extractTextFromImage = async (imageUrl: string) => {
  try {
    const formData = new FormData();
    formData.append('image_path', imageUrl);

    const response = await axios.post(`${VITE_ML_URL}/extract`,
      formData);
    console.log('Extracted text:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to extract text from image', error);
    return error;
  }
}

export const getOtp = async (email: string) => {
  try {
    const response = await axios.post(`${VITE_BASE_URL}/api/send-otp`, {
      to: email
    });
    return response.data;
  } catch (error) {
    console.error('Failed to get OTP', error);
    return error;
  }
}
export const registerUser = async (formData: SignupForm, idPhoto: string) => {
  try {
    const jsonData = {
      registrationNo: formData.registrationNumber,
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      department: formData.branch,
      idPhoto, // Ensure this is a base64-encoded string or URL
      dob: formData.dateOfBirth,
    };

    console.log('Request JSON:', jsonData);

    const response = await axios.post(`${VITE_BASE_URL}/api/students`, jsonData, {
      headers: {
        'Content-Type': 'application/json',
        'withCredentials': true
      },

    });

    console.log('Account created:', response.data);

    const token = response.data.token; // Ensure your API returns `token`

    if (token) {
      localStorage.setItem('authToken', token); // Save token in localStorage
      console.log('JWT Token saved to localStorage');
    }


    return response.data;
  } catch (error) {
    console.error('Failed to create account', error);
    return error;
  }
};

export const loginUser = async (email: string, password: string, role: string) => {
  try {
    const jsonData = {
      email,
      password
    };
    const response = await axios.post(`${VITE_BASE_URL}/api/${role}/login`, jsonData, {
      headers: {
        'Content-Type': 'application/json',
        'withCredentials': true
      },
    });
    const token = response.data.token; // Ensure your API returns `token`

    if (token) {
      localStorage.setItem('token', token);
    }
    return response;
  } catch (error) {
    console.error('Failed to login', error);
    return error;
  }
}





export const getLoginUser = async () => {
  try {
    const response = await axios.get(`${VITE_BASE_URL}/api/students/me`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to get user', error);
    return error;
  }
}
