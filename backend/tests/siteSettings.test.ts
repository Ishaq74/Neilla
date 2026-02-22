import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../src/index';

describe('SiteSettings API', () => {
  it('GET /api/siteSettings retourne la liste', async () => {
    const res = await request(app).get('/api/siteSettings');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/siteSettings/:id retourne un réglage ou 404', async () => {
    const res = await request(app).get('/api/siteSettings/1');
    expect([200, 404]).toContain(res.status);
  });

  it('POST /api/siteSettings refuse sans token', async () => {
    const res = await request(app).post('/api/siteSettings').send({});
    expect(res.status).toBe(401);
  });

  it('PUT /api/siteSettings/:id refuse sans token', async () => {
    const res = await request(app).put('/api/siteSettings/1').send({});
    expect(res.status).toBe(401);
  });

  it('DELETE /api/siteSettings/:id refuse sans token', async () => {
    const res = await request(app).delete('/api/siteSettings/1');
    expect(res.status).toBe(401);
  });
});
