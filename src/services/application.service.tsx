import axiosInstance from "./axiosInstance";

export const getAllApplications = async () => {
  try {
    const response = await axiosInstance.get("/api/applications/all");
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Approval failed';
  }
};

export const getFacultyApplications = async () => {
  try {
    const response = await axiosInstance.get("/api/applications/my-authority-applications");
    return response.data.applications;
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Approval failed';
  }
};

export const getMyApplications = async () => {
  try {
    const response = await axiosInstance.get("/api/applications/my-applications");
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Approval failed';
  }
};

export const createApplication = async (data: any) => {
  try {
    const response = await axiosInstance.post("/api/applications", data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Approval failed';
  }
};

export const getAllApplicationSenders = async () => {
  try {
    const response = await axiosInstance.get("/api/applications/senders");
    return response.data.faculties;
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Approval failed';
  }
};

export const approveApplication = async (applicationId: string) => {
  try {
    const response = await axiosInstance.patch(`/api/applications/approve/${applicationId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Approval failed';
  }
};

export const rejectApplication = async (applicationId: string, reason: string) => {
  try {
    const response = await axiosInstance.patch(`/api/applications/reject/${applicationId}`, { reason });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Rejection failed';
  }
};

export const sendBackApplication = async (applicationId: string, reason: string) => {
  try {
    const response = await axiosInstance.patch(`/api/applications/send-back/${applicationId}`, { reason });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Rejection failed';
  }
};