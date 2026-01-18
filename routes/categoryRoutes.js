const express = require('express');
const router = express.Router();
const { getCategories } = require('../controllers/categoryController');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Get predefined categories
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: List all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get('/', getCategories);

module.exports = router;
