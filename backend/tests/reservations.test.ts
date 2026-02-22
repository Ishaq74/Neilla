import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../src/index';

describe('Reservations API', () => {
  it('GET /api/reservations retourne la liste', async () => {
    const res = await request(app).get('/api/reservations');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/reservations/:id retourne une réservation ou 404', async () => {
    const res = await request(app).get('/api/reservations/1');
    expect([200, 404]).toContain(res.status);
  });

  it('POST /api/reservations refuse sans token', async () => {
    const res = await request(app).post('/api/reservations').send({});
    expect(res.status).toBe(401);
  });

  it('PUT /api/reservations/:id refuse sans token', async () => {
    const res = await request(app).put('/api/reservations/1').send({});
    expect(res.status).toBe(401);
  });

  it('DELETE /api/reservations/:id refuse sans token', async () => {
    const res = await request(app).delete('/api/reservations/1');
    expect(res.status).toBe(401);
  });
});
