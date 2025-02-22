import axios from "axios";
import { VITE_BASE_URL, VITE_ML_URL } from "../main"

export const getAllComplaints = async () => {
  try {
    const response = await axios.get(`${VITE_BASE_URL}/api/complaints`);
    return response.data;
  } catch (error) {
    console.error('Failed to get complaints', error);
    return error;
  }
}