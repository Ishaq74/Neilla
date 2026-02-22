import axios from 'axios';

const API_URL = '/api/invoices';

export async function getInvoices() {
  const { data } = await axios.get(API_URL);
  return data;
}

export async function createInvoice(invoice) {
  const { data } = await axios.post(API_URL, invoice);
  return data;
}

export async function updateInvoice(id, invoice) {
  const { data } = await axios.put(`${API_URL}/${id}`, invoice);
  return data;
}

export async function deleteInvoice(id) {
  await axios.delete(`${API_URL}/${id}`);
}

export async function createInvoiceItem(invoiceId, item) {
  const { data } = await axios.post(`${API_URL}/${invoiceId}/items`, item);
  return data;
}

export async function updateInvoiceItem(id, item) {
  const { data } = await axios.put(`${API_URL}/items/${id}`, item);
  return data;
}

export async function deleteInvoiceItem(id) {
  await axios.delete(`${API_URL}/items/${id}`);
}
