const getCategories = (req, res) => {
    const categories = [
        { id: 1, name: 'Food', type: 'expense' },
        { id: 2, name: 'Rent', type: 'expense' },
        { id: 3, name: 'Salary', type: 'income' },
        { id: 4, name: 'Entertainment', type: 'expense' },
        { id: 5, name: 'Utilities', type: 'expense' },
        { id: 6, name: 'Healthcare', type: 'expense' },
        { id: 7, name: 'Freelance', type: 'income' },
        { id: 8, name: 'Shopping', type: 'expense' },
    ];

    res.status(200).json({
        success: true,
        count: categories.length,
        data: categories,
    });
};

module.exports = { getCategories };
