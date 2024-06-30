// // // tests/user.test.js

// const request = require('supertest');
// const app = require('../app');  // Correct path to your app.js

// describe('User API', () => {
//     it('POST /api/users --> create user', async () => {
//         await request(app)
//             .post('/api/users')
//             .send({ firstName: 'John', lastName: 'Doe' })
//             .expect(201);
//     });

//     it('GET /api/users --> array of users', async () => {
//         await request(app)
//             .get('/api/users')
//             .expect(200)
//             .expect('Content-Type', /json/);
//     });
// });
// const request = require('supertest');
// const app = require('../app');  // Ensure the path to your app.js is correct

// describe('User API', () => {
//     let createdUserId;

//     // Test creating a new user
//     it('POST /api/users --> create user', async () => {
//         const response = await request(app)
//             .post('/api/users')
//             .send({ firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' })
//             .expect(201)
//             .expect('Content-Type', /json/);
//         createdUserId = response.body.id;  // Save the created user ID for later tests
//         expect(response.body).toEqual({
//             id: expect.any(Number),
//             firstName: 'John',
//             lastName: 'Doe',
//             email: 'john.doe@example.com',
//             createdAt: expect.any(String),
//             updatedAt: expect.any(String)
//         });
//     });

//     // Test retrieving all users
//     it('GET /api/users --> array of users', async () => {
//         await request(app)
//             .get('/api/users')
//             .expect(200)
//             .expect('Content-Type', /json/)
//             .expect(response => {
//                 expect(response.body).toEqual(expect.arrayContaining([
//                     expect.objectContaining({ firstName: 'John', lastName: 'Doe' })
//                 ]));
//             });
//     });

//     // Test retrieving a single user by ID
//     it('GET /api/users/:id --> specific user by ID', async () => {
//         await request(app)
//             .get(`/api/users/${createdUserId}`)
//             .expect(200)
//             .expect('Content-Type', /json/)
//             .expect(response => {
//                 expect(response.body).toEqual({
//                     id: createdUserId,
//                     firstName: 'John',
//                     lastName: 'Doe',
//                     email: 'john.doe@example.com',
//                     createdAt: expect.any(String),
//                     updatedAt: expect.any(String)
//                 });
//             });
//     });

//     // Test updating a user
//     it('PUT /api/users/:id --> update specific user', async () => {
//         await request(app)
//             .put(`/api/users/${createdUserId}`)
//             .send({ firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com' })
//             .expect(200)
//             .expect('Content-Type', /json/)
//             .expect(response => {
//                 expect(response.body).toEqual({
//                     id: createdUserId,
//                     firstName: 'Jane',
//                     lastName: 'Doe',
//                     email: 'jane.doe@example.com',
//                     createdAt: expect.any(String),
//                     updatedAt: expect.any(String)
//                 });
//             });
//     });

//     // Test deleting a user
//     it('DELETE /api/users/:id --> delete specific user', async () => {
//         await request(app)
//             .delete(`/api/users/${createdUserId}`)
//             .expect(200)
//             .expect(response => {
//                 expect(response.text).toEqual('User deleted');
//             });

//         // Verify the user is actually deleted
//         await request(app)
//             .get(`/api/users/${createdUserId}`)
//             .expect(404);
//     });
// });


const request = require('supertest');
const app = require('../app'); // Adjust the path to ensure it's correctly pointing to your Express app

describe('User Management', () => {
  let createdUserId;

  // Test for creating a user
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users/')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        username: 'john123',  // Adding required username
        password: 'securePassword123'  // Adding required password
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('email', 'john.doe@example.com');
    createdUserId = res.body.id; // Save the created user id for further tests
  });

  // Test for retrieving all users
  it('should retrieve all users', async () => {
    const res = await request(app).get('/api/users/');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
  });

  // Test for retrieving a single user by ID
  it('should retrieve a user by ID', async () => {
    const res = await request(app).get(`/api/users/${createdUserId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', createdUserId);
  });

  // Test for updating a user
  it('should update an existing user', async () => {
    const res = await request(app)
      .put(`/api/users/${createdUserId}`)
      .send({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('email', 'jane.doe@example.com');
  });

  // Test for deleting a user
  it('should delete a user', async () => {
    const res = await request(app).delete(`/api/users/${createdUserId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual("User deleted");
  });
});