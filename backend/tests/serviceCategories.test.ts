import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../src/index';

describe('ServiceCategories API', () => {
  it('GET /api/serviceCategories retourne la liste', async () => {
    const res = await request(app).get('/api/serviceCategories');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/serviceCategories/:id retourne une catégorie ou 404', async () => {
    const res = await request(app).get('/api/serviceCategories/1');
    expect([200, 404]).toContain(res.status);
  });

  it('POST /api/serviceCategories refuse sans token', async () => {
    const res = await request(app).post('/api/serviceCategories').send({});
    expect(res.status).toBe(401);
  });

  it('PUT /api/serviceCategories/:id refuse sans token', async () => {
    const res = await request(app).put('/api/serviceCategories/1').send({});
    expect(res.status).toBe(401);
  });

  it('DELETE /api/serviceCategories/:id refuse sans token', async () => {
    const res = await request(app).delete('/api/serviceCategories/1');
    expect(res.status).toBe(401);
  });
});
