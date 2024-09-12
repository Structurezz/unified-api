// routes/transactionRoutes.js
import express from 'express';
import { createTransaction, getTransactionStatus } from '../app/controllers/transactionController.js';

const router = express.Router();

// Define the route to create a new transaction
router.post('/', createTransaction);

// Define the route to get the status of a specific transaction
router.get('/:transactionId/status', getTransactionStatus);

export default router;
