import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../src/index';

describe('FormationCategories API', () => {
  it('GET /api/formationCategories retourne la liste', async () => {
    const res = await request(app).get('/api/formationCategories');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/formationCategories/:id retourne une catégorie ou 404', async () => {
    const res = await request(app).get('/api/formationCategories/1');
    expect([200, 404]).toContain(res.status);
  });

  it('POST /api/formationCategories refuse sans token', async () => {
    const res = await request(app).post('/api/formationCategories').send({});
    expect(res.status).toBe(401);
  });

  it('PUT /api/formationCategories/:id refuse sans token', async () => {
    const res = await request(app).put('/api/formationCategories/1').send({});
    expect(res.status).toBe(401);
  });

  it('DELETE /api/formationCategories/:id refuse sans token', async () => {
    const res = await request(app).delete('/api/formationCategories/1');
    expect(res.status).toBe(401);
  });
});
