try {
    const User = require('../models/User');
    console.log('User loaded successfully');
} catch (error) {
    console.error('Error loading User:', error);
}
