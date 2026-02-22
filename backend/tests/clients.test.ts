import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../src/index';

describe('Clients API', () => {
  it('GET /api/clients retourne la liste', async () => {
    const res = await request(app).get('/api/clients');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/clients/:id retourne un client ou 404', async () => {
    const res = await request(app).get('/api/clients/1');
    expect([200, 404]).toContain(res.status);
  });

  it('POST /api/clients refuse sans token', async () => {
    const res = await request(app).post('/api/clients').send({});
    expect(res.status).toBe(401);
  });

  it('PUT /api/clients/:id refuse sans token', async () => {
    const res = await request(app).put('/api/clients/1').send({});
    expect(res.status).toBe(401);
  });

  it('DELETE /api/clients/:id refuse sans token', async () => {
    const res = await request(app).delete('/api/clients/1');
    expect(res.status).toBe(401);
  });
});
