import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../src/index';

describe('MediaLibrary API', () => {
  it('GET /api/mediaLibrary retourne la liste', async () => {
    const res = await request(app).get('/api/mediaLibrary');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/mediaLibrary/:id retourne un média ou 404', async () => {
    const res = await request(app).get('/api/mediaLibrary/1');
    expect([200, 404]).toContain(res.status);
  });

  it('POST /api/mediaLibrary refuse sans token', async () => {
    const res = await request(app).post('/api/mediaLibrary').send({});
    expect(res.status).toBe(401);
  });

  it('PUT /api/mediaLibrary/:id refuse sans token', async () => {
    const res = await request(app).put('/api/mediaLibrary/1').send({});
    expect(res.status).toBe(401);
  });

  it('DELETE /api/mediaLibrary/:id refuse sans token', async () => {
    const res = await request(app).delete('/api/mediaLibrary/1');
    expect(res.status).toBe(401);
  });
});
