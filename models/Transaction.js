const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: [true, 'Please add a text'],
    },
    amount: {
        type: Number,
        required: [true, 'Please add a positive or negative number'],
    },
    type: {
        type: String,
        enum: ['income', 'expense', 'revenue'],
        required: true,
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Transaction', TransactionSchema);
