import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../src/index';

describe('Quotes API', () => {
  it('GET /api/quotes retourne la liste', async () => {
    const res = await request(app).get('/api/quotes');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/quotes/:id retourne un devis ou 404', async () => {
    const res = await request(app).get('/api/quotes/1');
    expect([200, 404]).toContain(res.status);
  });

  it('POST /api/quotes refuse sans token', async () => {
    const res = await request(app).post('/api/quotes').send({});
    expect(res.status).toBe(401);
  });

  it('PUT /api/quotes/:id refuse sans token', async () => {
    const res = await request(app).put('/api/quotes/1').send({});
    expect(res.status).toBe(401);
  });

  it('DELETE /api/quotes/:id refuse sans token', async () => {
    const res = await request(app).delete('/api/quotes/1');
    expect(res.status).toBe(401);
  });
});
