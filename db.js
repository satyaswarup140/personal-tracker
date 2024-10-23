// config/db.js
const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file

// Define the path for your SQLite database from the environment variable
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, process.env.DATABASE_URL || 'database.sqlite'), // Use the DATABASE_URL from .env
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the SQLite database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
