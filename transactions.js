const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Define route to get all transactions
router.get('/', transactionController.getAllTransactions); // GET /transactions

// Define route to create a transaction
router.post('/', transactionController.createTransaction); // POST /transactions

// Define route to get a transaction by ID
router.get('/:id', transactionController.getTransactionById); // GET /transactions/:id

// Define route to update a transaction by ID
router.put('/:id', transactionController.updateTransaction); // PUT /transactions/:id

// Define route to delete a transaction by ID
router.delete('/:id', transactionController.deleteTransaction); // DELETE /transactions/:id

module.exports = router;

