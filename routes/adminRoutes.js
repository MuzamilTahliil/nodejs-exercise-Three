const express = require('express');
const router = express.Router();
const { getAdminOverview } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin only features
 */

/**
 * @swagger
 * /admin/overview:
 *   get:
 *     summary: Get system stats
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: System stats
 */
router.get('/overview', protect, authorize('admin'), getAdminOverview);

module.exports = router;
