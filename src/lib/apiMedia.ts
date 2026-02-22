import axios from "axios";

const API_BASE_URL = process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3001/api";

export const fetchMedia = async (category?: string, search?: string) => {
  const params: Record<string, string> = {};
  if (category && category !== "all") params.category = category;
  if (search) params.search = search;
  const res = await axios.get(`${API_BASE_URL}/media`, { params });
  return res.data;
};

export const uploadMedia = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axios.post(`${API_BASE_URL}/media/upload`, formData);
  return res.data;
};

export const deleteMedia = async (id: string) => {
  const res = await axios.delete(`${API_BASE_URL}/media/${id}`);
  return res.data;
};

export const updateMedia = async (id: string, data: Record<string, unknown>) => {
  const res = await axios.put(`${API_BASE_URL}/media/${id}`, data);
  return res.data;
};
