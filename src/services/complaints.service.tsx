import axios from "axios";
import { VITE_BASE_URL, VITE_ML_URL } from "../main"

// export const getAllComplaints = async () => {
//   try {
//     const response = await axios.get(`${VITE_BASE_URL}/api/complaints`);
//     return response.data;
//   } catch (error) {
//     console.error('Failed to get complaints', error);
//     return error;
//   }
// }

export const getAllComplaints = async () => {
  try {
    const response = await axios.get(`${VITE_BASE_URL}/api/complaints`, {
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

export const getMyComplaints = async () => {
  try {
    const response = await axios.get(`${VITE_BASE_URL}/api/complaints`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log('Complaints:', response.data);
    return response.data.applications;
  } catch (error) {
    console.error('Error fetching applications:', error);
    return error;
  }
}

export const createComplaint = async (complaint: any) => {
  try {
    const response = await axios.post(`${VITE_BASE_URL}/api/complaints`, complaint, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create complaint', error);
    return error;
  }
}


export const getAllComplaintSenders = async () => {
  try {
    const response = await axios.get(`${VITE_BASE_URL}/api/complaints/senders`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log('Senders::', response.data);
    return response.data.faculties;
  } catch (error) {
    console.error('Error fetching senders:', error);
    return error;
  }
}
