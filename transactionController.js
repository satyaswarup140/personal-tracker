const fs = require('fs');
const path = require('path');
const { body, validationResult } = require('express-validator');
const Transaction = require('../models/transaction');

// Create a transaction (POST /transactions)
exports.createTransaction = [
  body('type').isString().notEmpty().withMessage('Type is required.'),
  body('category').isString().notEmpty().withMessage('Category is required.'),
  body('amount').isFloat().withMessage('Amount must be a number.'),
  body('date').isISO8601().withMessage('Date must be a valid date.'),
  body('description').optional().isString(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const transaction = await Transaction.create(req.body);
      res.status(201).json(transaction);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];

// Get all transactions (GET /transactions)
// Option 1: Read from the database
exports.getAllTransactions = async (req, res) => {
  console.log("GET /transactions called"); // Log request
  try {
    const transactions = await Transaction.findAll();
    if (transactions.length === 0) {
      // If no transactions in the database, read from transactions.json
      return this.getTransactionsFromFile(req, res);
    }
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error); // Log error
    res.status(500).json({ message: 'Error fetching transactions', error });
  }
};

// Option 2: Read transactions from the transactions.json file
exports.getTransactionsFromFile = (req, res) => {
  try {
    // Read the transactions.json file
    const dataPath = path.join(__dirname, '../transactions.json');
    const jsonData = fs.readFileSync(dataPath, 'utf8');
    
    // Parse the JSON data
    const transactions = JSON.parse(jsonData);

    // Respond with the data
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions from file', error });
  }
};

// Get a transaction by ID (GET /transactions/:id)
exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a transaction by ID (PUT /transactions/:id)
exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    await transaction.update(req.body);
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a transaction by ID (DELETE /transactions/:id)
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    await transaction.destroy();
    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Insert dummy data if the database is empty
exports.insertDummyData = async () => {
  try {
    const transactions = [
      { type: 'Income', category: 'Salary', amount: 5000, date: '2024-10-01', description: 'Monthly salary' },
      { type: 'Expense', category: 'Rent', amount: -1500, date: '2024-10-02', description: 'Rent payment' },
      { type: 'Expense', category: 'Groceries', amount: -300, date: '2024-10-03', description: 'Grocery shopping' },
      { type: 'Income', category: 'Freelance', amount: 1200, date: '2024-10-05', description: 'Web development gig' },
      { type: 'Expense', category: 'Transport', amount: -100, date: '2024-10-06', description: 'Train fare' },
      { type: 'Income', category: 'Investment', amount: 800, date: '2024-10-07', description: 'Stock dividends' },
      { type: 'Expense', category: 'Entertainment', amount: -200, date: '2024-10-08', description: 'Movie tickets' },
      { type: 'Expense', category: 'Bills', amount: -600, date: '2024-10-09', description: 'Electricity bill' },
      { type: 'Income', category: 'Gift', amount: 300, date: '2024-10-10', description: 'Birthday gift' },
      { type: 'Expense', category: 'Shopping', amount: -400, date: '2024-10-11', description: 'Clothes shopping' }
    ];

    for (let transaction of transactions) {
      await Transaction.create(transaction);
    }
    console.log('Dummy data inserted successfully.');
  } catch (error) {
    console.error('Error inserting dummy data:', error);
  }
};
