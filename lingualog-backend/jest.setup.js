// jest.setup.js
const { sequelize } = require('./models');

beforeAll(async () => {
  await sequelize.sync({ force: true }); // This will reset the database before each test run
  // Optionally run seeders or insert test data directly
});

afterAll(async () => {
  await sequelize.close(); // Close the connection after tests
});