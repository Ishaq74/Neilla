export async function getAdminFormations() {
  const { data } = await axios.get(`${API_URL}/admin`);
  return data;
}
import axios from 'axios';

const API_URL = '/api/formations';

export async function getFormations() {
  const { data } = await axios.get(API_URL);
  return data;
}

export async function createFormation(formation) {
  const { data } = await axios.post(API_URL, formation);
  return data;
}

export async function updateFormation(id, formation) {
  const { data } = await axios.put(`${API_URL}/${id}`, formation);
  return data;
}

export async function deleteFormation(id) {
  await axios.delete(`${API_URL}/${id}`);
}
