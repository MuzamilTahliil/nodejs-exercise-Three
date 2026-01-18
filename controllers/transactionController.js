const Transaction = require('../models/Transaction');

// @desc    Get all transactions
// @route   GET /transactions
// @access  Private
const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user.id });

        res.status(200).json({
            count: transactions.length,
            data: transactions,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Server Error',
        });
    }
};

// @desc    Add transaction
// @route   POST /transactions
// @access  Private
const addTransaction = async (req, res) => {
    try {
        const { title, amount, type, category, date } = req.body;

        const transaction = await Transaction.create({
            title,
            amount,
            type,
            category,
            date,
            user: req.user.id,
        });

        res.status(201).json({
            success: true,
            data: transaction,
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map((val) => val.message);
            return res.status(400).json({
                success: false,
                error: messages,
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error',
            });
        }
    }
};

// @desc    Update transaction
// @route   PUT /transactions/:id
// @access  Private
const updateTransaction = async (req, res) => {
    try {
        let transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({
                success: false,
                error: 'No transaction found',
            });
        }

        // Make sure user owns transaction
        if (transaction.user.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                error: 'User not authorized',
            });
        }

        transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            data: transaction,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Server Error',
        });
    }
};

// @desc    Delete transaction
// @route   DELETE /transactions/:id
// @access  Private
const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({
                success: false,
                error: 'No transaction found',
            });
        }

        // Make sure user owns transaction
        if (transaction.user.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                error: 'User not authorized',
            });
        }

        await transaction.deleteOne();

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: 'Server Error',
        });
    }
};

// @desc    Get monthly summary
// @route   GET /transactions/monthly-summary
// @access  Private
const getMonthlySummary = async (req, res) => {
    try {
        const summary = await Transaction.aggregate([
            // Match user transactions
            {
                $match: {
                    user: req.user._id, // req.user.id is string, _id is ObjectId. Mongoose middleware attaches document usually so _id works.
                },
            },
            // Group by type and category
            {
                $group: {
                    _id: {
                        // month: { $month: '$date' },
                        // year: { $year: '$date' },
                        type: '$type',
                        category: '$category',
                    },
                    totalAmount: { $sum: '$amount' },
                },
            },
            // Sort by amount
            {
                $sort: { totalAmount: -1 },
            },
        ]);

        res.status(200).json({
            success: true,
            data: summary,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: 'Server Error',
        });
    }
};

module.exports = {
    getTransactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    getMonthlySummary,
};
