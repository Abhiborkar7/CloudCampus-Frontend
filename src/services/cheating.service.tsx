import axios from "axios"
import { VITE_BASE_URL, VITE_ML_URL } from "../main"
import { SignupForm } from "../types/types";


export const createCheating = async (formData:any) => {
  try {

    const response = await axios.post(`${VITE_BASE_URL}/api/cheatings/`, formData);
    return response.data;
  } catch (error) {
    console.log(error)
    return null;
  }
}

export const getCheatings = async () => {
    try {
  
      const response = await axios.get(`${VITE_BASE_URL}/api/cheatings/`);
      return response.data;
    } catch (error) {
      console.log(error)
      return null;
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
    console.log(VITE_BASE_URL)

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


  export const loginUser = async (email: string, password: string) => {
    try {
      const jsonData = {
        email,
        password
      };
      const response = await axios.post(`${VITE_BASE_URL}/api/students/login`, jsonData ,{
       headers: {
        'withCredentials': true
      },
      });
      const token = response.data.token; // Ensure your API returns `token`

      if (token) {
        localStorage.setItem('token', token); 
        document.cookie = `token=${token}; path=/; max-age=3600`; 

      }

      return response.data;
    } catch (error) {
      console.error('Failed to login', error);
      return error;
    }
  }