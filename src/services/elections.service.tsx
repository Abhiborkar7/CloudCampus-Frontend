import axios from 'axios';
import { VITE_BASE_URL, VITE_BLOCKCHAIN_URL } from '../main';



export async function fetchCurrentElection() {

  try {
    const response = await axios.get(`${VITE_BLOCKCHAIN_URL}/allResults`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch current election', error);
    throw error;
  }
  
}

export async function fetchResult(electionId: string) {
  try {
    const response = await axios.get(`${VITE_BASE_URL}/api/elections/${electionId}/result`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch election result', error);
    throw error;
  }
}

export async function addElection(electionData: any) {
  try {
    const response = await axios.post(`${VITE_BASE_URL}/api/elections`, electionData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to add election', error);
    throw error;
  }
}


