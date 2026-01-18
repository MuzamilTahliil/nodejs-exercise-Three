const User = require('../models/User');

// @desc    Upload profile picture
// @route   POST /upload/profile-picture
// @access  Private
const uploadProfilePicture = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Update user profile with image URL
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { profilePicture: req.file.path },
            { new: true }
        );

        res.status(200).json({
            success: true,
            data: req.file.path,
            user: user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    uploadProfilePicture,
};
