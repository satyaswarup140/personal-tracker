# Personal Expense Tracker

## Description

A RESTful API to manage personal expenses and incomes. This project allows users to track their transactions, categorize them, and manage their financial records efficiently.

## Features

- Create, read, update, and delete transactions (CRUD operations).
- Support for categorizing transactions (e.g., Income, Expense).
- Validation of transaction data.
- Integration with SQLite for data storage.
- Dummy data insertion for testing purposes.

## Tech Stack

- **Node.js**: JavaScript runtime for building the API.
- **Express**: Web framework for Node.js.
- **Sequelize**: ORM for interacting with the SQLite database.
- **SQLite**: Lightweight database engine.
- **dotenv**: Module to load environment variables from a `.env` file.
- **express-validator**: Middleware for validating request data.
- **nodemon**: Tool for automatically restarting the server during development.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/satyaswarup140/Expense-Income-Tracker.git

2. Navigate to the project directory:
   cd personal-expense-tracker

3. Install the dependencies:
   npm install

4. Create a .env file in the root directory with the following content:
   DATABASE_URL=./database.sqlite
   PORT=3005 

5. Start the server:
   npm run dev

6. test the API endpoints using Postman or your preferred API client:

   . GET /transactions: Fetch all transactions.
   . POST /transactions: Create a new transaction (send a JSON body).
   . GET /transactions/
     : Fetch a specific transaction by ID.
   . PUT /transactions/
     : Update a specific transaction by ID (send a JSON body).
   . DELETE /transactions/
     : Delete a transaction by ID.
