const express = require('express');
const router = express.Router();
const {
    getTransactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    getMonthlySummary,
} = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateResource');
const { transactionSchema } = require('../schemas/transaction.schema');

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Manage income and expenses
 */

router.use(protect); // All routes protected

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of transactions
 *   post:
 *     summary: Add a new transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - amount
 *               - type
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Transaction created
 */
router.route('/').get(getTransactions).post(validate(transactionSchema), addTransaction);

/**
 * @swagger
 * /transactions/monthly-summary:
 *   get:
 *     summary: Get monthly summary by category
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Summary data
 */
router.get('/monthly-summary', getMonthlySummary);

/**
 * @swagger
 * /transactions/{id}:
 *   put:
 *     summary: Update transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Transaction updated
 *   delete:
 *     summary: Delete transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction deleted
 */
router.route('/:id').put(updateTransaction).delete(deleteTransaction);

module.exports = router;
