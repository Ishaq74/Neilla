import axios from 'axios';

const API_URL = '/api/quotes';

export async function getQuotes() {
  const { data } = await axios.get(API_URL);
  return data;
}

export async function createQuote(quote) {
  const { data } = await axios.post(API_URL, quote);
  return data;
}

export async function updateQuote(id, quote) {
  const { data } = await axios.put(`${API_URL}/${id}`, quote);
  return data;
}

export async function deleteQuote(id) {
  await axios.delete(`${API_URL}/${id}`);
}

export async function createQuoteItem(quoteId, item) {
  const { data } = await axios.post(`${API_URL}/${quoteId}/items`, item);
  return data;
}

export async function updateQuoteItem(id, item) {
  const { data } = await axios.put(`${API_URL}/items/${id}`, item);
  return data;
}

export async function deleteQuoteItem(id) {
  await axios.delete(`${API_URL}/items/${id}`);
}
