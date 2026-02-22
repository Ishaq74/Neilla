export async function getSiteSettings() {
  const { data } = await axios.get('/api/site-settings');
  return data;
}

export async function getActiveTheme() {
  const { data } = await axios.get('/api/theme-settings/active');
  return data;
}
import axios from 'axios';

const API_URL = '/api/site-content';

export async function getSiteContent() {
  const { data } = await axios.get(API_URL);
  return data;
}

export async function updateSiteContent(id: string | number, content: unknown) {
  const { data: updated } = await axios.put(`${API_URL}/${id}`, content);
  return updated;
}

export async function createSiteContent(content: unknown) {
  const { data } = await axios.post(API_URL, content);
  return data;
}

export async function deleteSiteContent(id: string | number) {
  await axios.delete(`${API_URL}/${id}`);
}
