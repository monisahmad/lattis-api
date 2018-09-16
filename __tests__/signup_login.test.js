import request from 'supertest';
import app from '../src/server';


const randomNumber = Math.floor(100000 + (Math.random() * 900000));

const dummyUser = {
  username: `user${randomNumber}`,
  birthDate: '2018-09-04',
  userPassword: 'password',
  firstName: 'user',
  lastName: `${randomNumber}`,
};

describe('Testing Signup', () => {
  afterAll(async () => {
    await app.server.close(() =>
      this.emitDestroy());
  });
  test('Server Status', async () => {
    const response = await request(app).get('/status');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ status: 'Server is Running' });
  });

  test('Testing Signup', async () => {
    const response = await request(app).post('/signup').send(dummyUser).set('Content-Type', 'application/x-www-form-urlencoded');
    expect(response.body.success).toBe(true);
    expect(response.statusCode).toBe(200);
  }, 10000);

  test('Testing Login', async () => {
    const loginUser = {
      username: `user${randomNumber}`,
      userPassword: 'password',
    };
    const response = await request(app).post('/login').send(loginUser).set('Content-Type', 'application/x-www-form-urlencoded');
    expect(response.body.success).toBe(true);
    expect(response.statusCode).toBe(200);
  }, 10000);
});
