const { Sequelize } = require('sequelize');

// Environment variables are often used to manage database credentials securely.
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres',  // This is where you specify your DB dialect
    logging: console.log, // Enable logging; using console.log here but you can adjust as needed for production
});

module.exports = sequelize;