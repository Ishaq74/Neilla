import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../src/index';

describe('ThemeSettings API', () => {
  it('GET /api/themeSettings retourne la liste', async () => {
    const res = await request(app).get('/api/themeSettings');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/themeSettings/:id retourne un réglage ou 404', async () => {
    const res = await request(app).get('/api/themeSettings/1');
    expect([200, 404]).toContain(res.status);
  });

  it('POST /api/themeSettings refuse sans token', async () => {
    const res = await request(app).post('/api/themeSettings').send({});
    expect(res.status).toBe(401);
  });

  it('PUT /api/themeSettings/:id refuse sans token', async () => {
    const res = await request(app).put('/api/themeSettings/1').send({});
    expect(res.status).toBe(401);
  });

  it('DELETE /api/themeSettings/:id refuse sans token', async () => {
    const res = await request(app).delete('/api/themeSettings/1');
    expect(res.status).toBe(401);
  });
});
