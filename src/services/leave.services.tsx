import axios from "axios";
import { LeaveData } from "../types/types";
import { VITE_BASE_URL } from "../main";

export const createLeave = async (leaveData: LeaveData) => {
  try {
    const response = await axios.post(`${VITE_BASE_URL}/health-leaves`, leaveData, {
      // headers: { 
      //   'Authorization': `Bearer ${localStorage.getItem('token')}`
      // }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create leave', error);
    return null;
  }
}
