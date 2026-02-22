import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../src/index';

describe('Invoices API', () => {
  it('GET /api/invoices retourne la liste', async () => {
    const res = await request(app).get('/api/invoices');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/invoices/:id retourne une facture ou 404', async () => {
    const res = await request(app).get('/api/invoices/1');
    expect([200, 404]).toContain(res.status);
  });

  it('POST /api/invoices refuse sans token', async () => {
    const res = await request(app).post('/api/invoices').send({});
    expect(res.status).toBe(401);
  });

  it('PUT /api/invoices/:id refuse sans token', async () => {
    const res = await request(app).put('/api/invoices/1').send({});
    expect(res.status).toBe(401);
  });

  it('DELETE /api/invoices/:id refuse sans token', async () => {
    const res = await request(app).delete('/api/invoices/1');
    expect(res.status).toBe(401);
  });
});
