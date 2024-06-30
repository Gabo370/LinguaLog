const request = require('supertest');
const app = require('../app'); // Update the path to where your Express app is exported

// describe('Authentication Routes', () => {
  describe('POST /api/auth/signup', () => {
    it('should create a new user and return a success message', async () => {
      
      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          username: 'gabrielo',
          password: 'gabrielo1234',
          email: 'gabriel@example.com'
        });
      console.log("JWT Secret:", process.env.JWT_SECRET);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('message', 'User created successfully');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should authenticate a user and return a JWT token', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'gabrielo',
          password: 'gabrielo1234'
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
    });
  });
  



