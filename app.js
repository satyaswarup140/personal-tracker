const express = require('express');
const app = express();
const transactionsRoutes = require('./routes/transactions');
const errorHandler = require('./middlewares/errorHandler');
const sequelize = require('./config/db'); // Import the sequelize instance
require('dotenv').config();

app.use(express.json()); // Middleware to parse JSON data
app.use('/transactions', transactionsRoutes); // Ensure this is correct

// Start the server
const PORT = process.env.PORT || 3005; // Ensure this matches the port you're using
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });

app.use(errorHandler); // Error handling middleware (optional)
