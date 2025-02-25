import axios from "axios";
import { VITE_BASE_URL } from "../main";

export const getAllApplications = async () => {
  try {
    const response = await axios.get(`${VITE_BASE_URL}/api/applications/all`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data.applications;
  } catch (error) {
    console.error('Error fetching applications:', error);
    return error;
  }
}

export const getMyApplications = async () => {
  try {
    const response = await axios.get(`${VITE_BASE_URL}/api/applications/my-applications`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data.applications;
  } catch (error) {
    console.error('Error fetching applications:', error);
    return error;
  }
}

export const createApplication = async (data: any) => {
  try {
    const response = await axios.post(`${VITE_BASE_URL}/api/applications`, data, {
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

