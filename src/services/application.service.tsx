import axiosInstance from "./axiosInstance";

export const getAllApplications = async () => {
  try {
    const response = await axiosInstance.get("/api/applications/all");
    return response.data.applications;
  } catch (error) {
    return error;
  }
};

export const getFacultyApplications = async () => {
  try {
    const response = await axiosInstance.get("/api/applications/applications-for-approval");
    return response.data.applications;
  } catch (error) {
    return error;
  }
};

export const getMyApplications = async () => {
  try {
    const response = await axiosInstance.get("/api/applications/my-applications");
    return response.data.applications;
  } catch (error) {
    return error;
  }
};

export const createApplication = async (data: any) => {
  try {
    const response = await axiosInstance.post("/api/applications", data);
    console.log("Data:", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllApplicationSenders = async () => {
  try {
    const response = await axiosInstance.get("/api/applications/senders");
    console.log("Senders::", response.data);
    return response.data.faculties;
  } catch (error) {
    return error;
  }
};
