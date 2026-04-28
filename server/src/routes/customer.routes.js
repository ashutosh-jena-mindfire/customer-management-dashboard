const express = require('express');
const router = express.Router();

const controller = require('../controllers/customer.controller');
const { validate } = require('../middlewares/validation.middleware');
const { validateCreateCustomer } = require('../validations/customer.validation');

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Add a new customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Customer created
 */
router.post('/', validate(validateCreateCustomer), controller.createCustomer);

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get all customers
 *     tags: [Customers]
 */
router.get('/', controller.getCustomers);

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Delete customer
 *     tags: [Customers]
 */
router.delete('/:id', controller.deleteCustomer);

module.exports = router;