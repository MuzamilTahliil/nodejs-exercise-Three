const { z } = require('zod');

const transactionSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: 'Title is required',
        }),
        amount: z.number({
            required_error: 'Amount is required',
        }),
        type: z.enum(['income', 'expense', 'revenue']),
        category: z.string({
            required_error: 'Category is required',
        }),
        date: z.string().optional(),
    }),
});

module.exports = {
    transactionSchema,
};
