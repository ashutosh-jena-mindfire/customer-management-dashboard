import express from 'express';
import { createCustomer, getCustomers, deleteCustomer } from '../controllers/customer.controller.js';
import { validate } from '../middlewares/validation.middleware.js';
import { validateCreateCustomer } from '../validations/customer.validation.ts';

const router = express.Router();

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
router.post('/customers', validate(validateCreateCustomer), createCustomer);

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get all customers
 *     tags: [Customers]
 */
router.get('/customers', getCustomers);

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Delete customer
 *     tags: [Customers]
 */
router.delete('/customers/:id', deleteCustomer);

export default router;
