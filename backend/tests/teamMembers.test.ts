import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../src/index';

describe('TeamMembers API', () => {
  it('GET /api/teamMembers retourne la liste', async () => {
    const res = await request(app).get('/api/teamMembers');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/teamMembers/:id retourne un membre ou 404', async () => {
    const res = await request(app).get('/api/teamMembers/1');
    expect([200, 404]).toContain(res.status);
  });

  it('POST /api/teamMembers refuse sans token', async () => {
    const res = await request(app).post('/api/teamMembers').send({});
    expect(res.status).toBe(401);
  });

  it('PUT /api/teamMembers/:id refuse sans token', async () => {
    const res = await request(app).put('/api/teamMembers/1').send({});
    expect(res.status).toBe(401);
  });

  it('DELETE /api/teamMembers/:id refuse sans token', async () => {
    const res = await request(app).delete('/api/teamMembers/1');
    expect(res.status).toBe(401);
  });
});
