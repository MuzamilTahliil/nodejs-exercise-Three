const User = require('../models/User');
const Transaction = require('../models/Transaction');

// @desc    Get system overview
// @route   GET /admin/overview
// @access  Private/Admin
const getAdminOverview = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalTransactions = await Transaction.countDocuments();

        // Calculate total amount moved (simple sum of all transactions absolute values or just count)
        // Let's get total income and total expenses across the platform
        const totals = await Transaction.aggregate([
            {
                $group: {
                    _id: '$type',
                    totalAmount: { $sum: '$amount' },
                },
            },
        ]);

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalTransactions,
                platformTotals: totals,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getAdminOverview,
};
