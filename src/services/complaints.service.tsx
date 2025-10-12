import axiosInstance from "./axiosInstance";

export const getAllComplaints = async () => {
  try {
    const response = await axiosInstance.get(`/api/complaints/`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Approval failed';
  }
}

export const getMyComplaints = async () => {
  try {
    const response = await axiosInstance.get(`/api/complaints/`);
    console.log('Complaints:', response.data);
    return response.data.applications;
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Approval failed';
  }
}

export const createComplaint = async (complaint: any) => {
  try {
    const response = await axiosInstance.post(`/api/complaints`, complaint);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Approval failed';
  }
}


export const getAllComplaintSenders = async () => {
  try {
    const response = await axiosInstance.get(`/api/complaints/senders`);
    return response.data.faculties;
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Approval failed';
  }
}
