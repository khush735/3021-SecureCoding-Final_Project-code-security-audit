import request from 'supertest';
import app from '../src/app';

describe('Health Check API', () => {
  it('should return health status', async () => {
    const response = await request(app).get('/api/v1/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body).toHaveProperty('uptime');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body.version).toBe('1.0.0');
  });
});