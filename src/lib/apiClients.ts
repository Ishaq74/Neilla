import axios from 'axios';

const API_URL = '/api/clients';

export async function getClients() {
  const { data } = await axios.get(API_URL);
  return data;
}

export async function createClient(client) {
  const { data } = await axios.post(API_URL, client);
  return data;
}

export async function updateClient(id, client) {
  const { data } = await axios.put(`${API_URL}/${id}`, client);
  return data;
}

export async function deleteClient(id) {
  await axios.delete(`${API_URL}/${id}`);
}
