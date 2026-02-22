import axios from 'axios';

const API_URL = '/api/blog';

export async function getBlogPosts() {
  const { data } = await axios.get(API_URL);
  return data;
}

export async function createBlogPost(post) {
  const { data } = await axios.post(API_URL, post);
  return data;
}

export async function updateBlogPost(id, post) {
  const { data } = await axios.put(`${API_URL}/${id}`, post);
  return data;
}

export async function deleteBlogPost(id) {
  await axios.delete(`${API_URL}/${id}`);
}

export async function getBlogCategories() {
  const { data } = await axios.get(`${API_URL}/categories`);
  return data;
}

export async function createBlogCategory(category) {
  const { data } = await axios.post(`${API_URL}/categories`, category);
  return data;
}

export async function updateBlogCategory(id, category) {
  const { data } = await axios.put(`${API_URL}/categories/${id}`, category);
  return data;
}

export async function deleteBlogCategory(id) {
  await axios.delete(`${API_URL}/categories/${id}`);
}
