import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../src/index';

describe('Profiles API', () => {
  it('GET /api/profiles retourne la liste', async () => {
    const res = await request(app).get('/api/profiles');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/profiles/:id retourne un profil ou 404', async () => {
    const res = await request(app).get('/api/profiles/1');
    expect([200, 404]).toContain(res.status);
  });

  it('POST /api/profiles refuse sans token', async () => {
    const res = await request(app).post('/api/profiles').send({});
    expect(res.status).toBe(401);
  });

  it('PUT /api/profiles/:id refuse sans token', async () => {
    const res = await request(app).put('/api/profiles/1').send({});
    expect(res.status).toBe(401);
  });

  it('DELETE /api/profiles/:id refuse sans token', async () => {
    const res = await request(app).delete('/api/profiles/1');
    expect(res.status).toBe(401);
  });
});
