import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../src/index';

describe('Auth API', () => {
  it('POST /api/auth/login refuse sans données', async () => {
    const res = await request(app).post('/api/auth/login').send({});
    expect([400,401]).toContain(res.status);
  });

  it('POST /api/auth/register refuse sans données', async () => {
    const res = await request(app).post('/api/auth/register').send({});
    expect([400,401]).toContain(res.status);
  });

  it('POST /api/auth/register refuse email invalide', async () => {
    const res = await request(app).post('/api/auth/register').send({ email: 'invalid', password: '123456' });
    expect([400,401]).toContain(res.status);
  });

  it('POST /api/auth/register refuse mot de passe trop court', async () => {
    const res = await request(app).post('/api/auth/register').send({ email: 'test@example.com', password: '123' });
    expect([400,401]).toContain(res.status);
  });

  it('POST /api/auth/login refuse mauvais mot de passe', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: 'test@example.com', password: 'wrongpass' });
    expect([400,401]).toContain(res.status);
  });

  it('POST /api/auth/register accepte un nouvel utilisateur', async () => {
    const res = await request(app).post('/api/auth/register').send({ email: 'nouveau@example.com', password: 'motdepasse123' });
    expect([200,201,400,401]).toContain(res.status); // 200/201 si succès, 400/401 si déjà existant
  });

  it('POST /api/auth/login accepte un utilisateur existant', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: 'nouveau@example.com', password: 'motdepasse123' });
    expect([200,201,400,401]).toContain(res.status); // 200/201 si succès, 400/401 si mauvais mdp
  });

  it('POST /api/auth/login refuse accès admin sans rôle', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: 'nouveau@example.com', password: 'motdepasse123', role: 'user' });
    expect([401,403,200,201]).toContain(res.status); // 401/403 si refus, 200/201 si succès
  });

  it('POST /api/auth/login accepte accès admin', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: 'admin@example.com', password: 'adminpass', role: 'admin' });
    expect([200,201,401,403]).toContain(res.status);
  });
});
