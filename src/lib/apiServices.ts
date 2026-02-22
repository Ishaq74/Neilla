export async function getAdminServices() {
  const { data } = await axios.get(`${API_URL}/admin`);
  return data;
}
import axios from 'axios';

const API_URL = '/api/services';

export async function getServices() {
  const { data } = await axios.get(API_URL);
  return data;
}

export async function createService(service) {
  const { data } = await axios.post(API_URL, service);
  return data;
}

export async function updateService(id, service) {
  const { data } = await axios.put(`${API_URL}/${id}`, service);
  return data;
}

export async function deleteService(id) {
  await axios.delete(`${API_URL}/${id}`);
}
