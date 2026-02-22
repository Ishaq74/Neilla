import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../src/index';

describe('Services API', () => {
  it('GET /api/services retourne la liste', async () => {
    const res = await request(app).get('/api/services');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/services/:id retourne un service ou 404', async () => {
    const res = await request(app).get('/api/services/1');
    expect([200, 404]).toContain(res.status);
  });

  it('POST /api/services refuse sans token', async () => {
    const res = await request(app).post('/api/services').send({});
    expect(res.status).toBe(401);
  });

  it('POST /api/services refuse sans admin', async () => {
    // Simuler un token utilisateur non admin
    const userToken = 'Bearer fake-user-token';
    const res = await request(app)
      .post('/api/services')
      .set('Authorization', userToken)
      .send({ name: 'Test', description: 'desc', price: 100, duration: 60 });
    expect([401, 403]).toContain(res.status);
  });

  it('POST /api/services refuse champs manquants', async () => {
    // Simuler un token admin
    const adminToken = 'Bearer fake-admin-token';
    const res = await request(app)
      .post('/api/services')
      .set('Authorization', adminToken)
      .send({ name: 'Test' });
    expect(res.status).toBe(400);
  });

  it('PUT /api/services/:id refuse sans token', async () => {
    const res = await request(app)
      .put('/api/services/1')
      .send({ name: 'Update' });
    expect(res.status).toBe(401);
  });

  it('PUT /api/services/:id refuse sans admin', async () => {
    const userToken = 'Bearer fake-user-token';
    const res = await request(app)
      .put('/api/services/1')
      .set('Authorization', userToken)
      .send({ name: 'Update' });
    expect([401, 403]).toContain(res.status);
  });

  it('PUT /api/services/:id retourne 404 si service absent', async () => {
    const adminToken = 'Bearer fake-admin-token';
    const res = await request(app)
      .put('/api/services/999')
      .set('Authorization', adminToken)
      .send({ name: 'Update' });
    expect(res.status).toBe(404);
  });

  it('DELETE /api/services/:id refuse sans token', async () => {
    const res = await request(app)
      .delete('/api/services/1');
    expect(res.status).toBe(401);
  });

  it('DELETE /api/services/:id refuse sans admin', async () => {
    const userToken = 'Bearer fake-user-token';
    const res = await request(app)
      .delete('/api/services/1')
      .set('Authorization', userToken);
    expect([401, 403]).toContain(res.status);
  });

  it('DELETE /api/services/:id retourne 404 si service absent', async () => {
    const adminToken = 'Bearer fake-admin-token';
    const res = await request(app)
      .delete('/api/services/999')
      .set('Authorization', adminToken);
    expect(res.status).toBe(404);
  });
});
