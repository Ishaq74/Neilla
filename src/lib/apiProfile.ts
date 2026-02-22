import axios from "axios";

const API_BASE_URL = process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3001/api";

export const updateProfile = async (userId: string, data: Record<string, unknown>) => {
  const res = await axios.put(`${API_BASE_URL}/profiles/${userId}`, data);
  return res.data;
};
