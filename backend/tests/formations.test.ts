import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../src/index';

describe('Formations API', () => {
  it('GET /api/formations retourne la liste', async () => {
    const res = await request(app).get('/api/formations');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/formations/:id retourne une formation ou 404', async () => {
    const res = await request(app).get('/api/formations/1');
    expect([200, 404]).toContain(res.status);
  });

  it('POST /api/formations refuse sans token', async () => {
    const res = await request(app).post('/api/formations').send({});
    expect(res.status).toBe(401);
  });

  it('PUT /api/formations/:id refuse sans token', async () => {
    const res = await request(app).put('/api/formations/1').send({});
    expect(res.status).toBe(401);
  });

  it('DELETE /api/formations/:id refuse sans token', async () => {
    const res = await request(app).delete('/api/formations/1');
    expect(res.status).toBe(401);
  });
});
