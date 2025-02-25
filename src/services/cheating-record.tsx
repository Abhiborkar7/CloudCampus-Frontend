import axios from "axios";
import { VITE_BASE_URL } from "../main";

export const createCheatingIncident = async (incident: any) => {
  try {
    const response = await axios.post(`${VITE_BASE_URL}/api/cheatings`, incident, {
      withCredentials: true,    
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if required
      },
});
    console.log('Cheating incident created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to create cheating incident', error);
    return error;
  }
}

export const getCheatingIncidents = async () => {
  try {
    const response = await axios.get(`${VITE_BASE_URL}/api/cheatings`);
    console.log('Cheating incidents fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch cheating incidents', error);
    return error;
  }
}