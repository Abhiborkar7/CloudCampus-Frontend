import axios from "axios";
import { VITE_BASE_URL } from "../main";

export const uploadImage = async (formData: FormData): Promise<string> => {
  try {

    const response = await axios.post("/api/image-upload", formData);
    return response.data.imageUrl; // Assuming the response contains { url: "image_url" }
  } catch (error) {
    console.error("Image upload error:", error);
    throw error;
  }
};


export const uploadImageToCloudinary = async (selectedFile: File) => {
  try {
    console.log('Selected file:', selectedFile)
    const formData = new FormData();
    formData.append('photo', selectedFile);

    const extractedTextResponse = await axios.post(`${VITE_BASE_URL}/api/image-upload`,
      formData
    )
    console.log('Extracted text:', extractedTextResponse.data)
    return extractedTextResponse.data
  }
  catch (error) {
    console.error('Failed to extract text from image', error)
    return error
  }
}