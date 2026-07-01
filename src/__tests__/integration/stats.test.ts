import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../app';

describe('GET /stats', () => {
  it('retourne les statistiques', async () => {
    const res = await request(app).get('/stats');

    expect(res.status).toBe(200);
    expect(res.body.bestCountry).toBeDefined();
    expect(res.body.bestCountry.code).toBeTypeOf('string');
    expect(res.body.bestCountry.winRatio).toBeTypeOf('number');
    expect(res.body.averageBMI).toBeTypeOf('number');
    expect(res.body.medianHeight).toBeTypeOf('number');
  });

  it('winRatio est compris entre 0 et 1', async () => {
    const res = await request(app).get('/stats');

    expect(res.body.bestCountry.winRatio).toBeGreaterThanOrEqual(0);
    expect(res.body.bestCountry.winRatio).toBeLessThanOrEqual(1);
  });

  it('averageBMI est un IMC réaliste (entre 10 et 50)', async () => {
    const res = await request(app).get('/stats');

    expect(res.body.averageBMI).toBeGreaterThan(10);
    expect(res.body.averageBMI).toBeLessThan(50);
  });
});
