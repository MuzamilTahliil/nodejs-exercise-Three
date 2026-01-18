const express = require('express');
const router = express.Router();
const parser = require('../config/cloudinary');
const { uploadProfilePicture } = require('../controllers/uploadController');
const { protect } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: File uploads
 */

/**
 * @swagger
 * /upload/profile-picture:
 *   post:
 *     summary: Upload profile picture
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded
 */
router.post(
    '/profile-picture',
    protect,
    parser.single('image'),
    uploadProfilePicture
);

module.exports = router;
