import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../src/index';

describe('SiteContent API', () => {
  it('GET /api/siteContent retourne la liste', async () => {
    const res = await request(app).get('/api/siteContent');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/siteContent/:id retourne un contenu ou 404', async () => {
    const res = await request(app).get('/api/siteContent/1');
    expect([200, 404]).toContain(res.status);
  });

  it('POST /api/siteContent refuse sans token', async () => {
    const res = await request(app).post('/api/siteContent').send({});
    expect(res.status).toBe(401);
  });

  it('PUT /api/siteContent/:id refuse sans token', async () => {
    const res = await request(app).put('/api/siteContent/1').send({});
    expect(res.status).toBe(401);
  });

  it('DELETE /api/siteContent/:id refuse sans token', async () => {
    const res = await request(app).delete('/api/siteContent/1');
    expect(res.status).toBe(401);
  });
});
