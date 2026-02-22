import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../src/index';

describe('Blog API', () => {
  it('GET /api/blog retourne la liste', async () => {
    const res = await request(app).get('/api/blog');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/blog/:id retourne un article ou 404', async () => {
    const res = await request(app).get('/api/blog/1');
    expect([200, 404]).toContain(res.status);
  });
});
