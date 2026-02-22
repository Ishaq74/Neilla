import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../src/index';

describe('UserRoles API', () => {
  it('GET /api/userRoles retourne la liste', async () => {
    const res = await request(app).get('/api/userRoles');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/userRoles/:id retourne un rôle ou 404', async () => {
    const res = await request(app).get('/api/userRoles/1');
    expect([200, 404]).toContain(res.status);
  });

  it('POST /api/userRoles refuse sans token', async () => {
    const res = await request(app).post('/api/userRoles').send({});
    expect(res.status).toBe(401);
  });

  it('PUT /api/userRoles/:id refuse sans token', async () => {
    const res = await request(app).put('/api/userRoles/1').send({});
    expect(res.status).toBe(401);
  });

  it('DELETE /api/userRoles/:id refuse sans token', async () => {
    const res = await request(app).delete('/api/userRoles/1');
    expect(res.status).toBe(401);
  });
});
