import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../src/index';

describe('Testimonials API', () => {
  it('GET /api/testimonials retourne la liste', async () => {
    const res = await request(app).get('/api/testimonials');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/testimonials/:id retourne un témoignage ou 404', async () => {
    const res = await request(app).get('/api/testimonials/1');
    expect([200, 404]).toContain(res.status);
  });

  it('POST /api/testimonials refuse sans token', async () => {
    const res = await request(app).post('/api/testimonials').send({});
    expect(res.status).toBe(401);
  });

  it('PUT /api/testimonials/:id refuse sans token', async () => {
    const res = await request(app).put('/api/testimonials/1').send({});
    expect(res.status).toBe(401);
  });

  it('DELETE /api/testimonials/:id refuse sans token', async () => {
    const res = await request(app).delete('/api/testimonials/1');
    expect(res.status).toBe(401);
  });
});
