import axios from "axios";
import { VITE_BASE_URL } from "../config";

export const gellAllApplications = async () => {
  try {
    const response = await axios.get(`${VITE_BASE_URL}/api/applications`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching applications:', error);
    return error;
  }
}

export const bookFacility = async (data: any) => {
  try {
    const response = await axios.post(`${VITE_BASE_URL}/api/facility/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating application:', error);
    return error;
  }
}

