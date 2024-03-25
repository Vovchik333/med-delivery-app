import { Router } from "express";
import { HttpCode } from "../../../common/enums/http/http-code.enum.js";
import * as orderService from "../../../services/order/order.service.js";
import { authorization } from "../../../middlewares/auth/auth.middleware.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The order ID.
 *           example: 66004d6a26f7b9219d887696
 *         user:
 *           $ref: '#/components/schemas/User'
 *         shoppingCart:
 *           $ref: '#/components/schemas/Cart'
 *         updatedAt:
 *           type: string
 *           description: time of the last update
 *           example: 2024-03-24T15:57:30.439+00:00
 *         createdAt:
 *           type: string
 *           description: creation time
 *           example: 2024-03-24T15:57:30.439+00:00
 */

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: All endpoints for managing orders
 */

const router = Router();

/**
 * @swagger
 * /api/v2/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     description: Returns the array of orders or message about error
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns an array of order
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get(
    '/', 
    authorization, 
    async (req, res, next) => {
        try {
            const { token } = req;
            const foundOrders = await orderService.findAllOrders(token);

            res.send(foundOrders);
        } catch (err) {
            next(err);
        }
    }
);

/**
 * @swagger
 * /api/v2/orders/{id}:
 *   get:
 *     summary: Get a order by id
 *     tags: [Orders]
 *     description: Returns the order according to the received id or message about error
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the order to retrieve.
 *         schema:
 *           type: string
 *           example: 66004d6a26f7b9219d887696
 *     responses:
 *       200:
 *         description:  Returns a order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const foundOrder = await orderService.findOrder(id);

        res.send(foundOrder);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/v2/orders:
 *   post:
 *     summary: Create a order
 *     tags: [Orders]
 *     description: Returns the created order or message about error
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Returns a order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */
router.post('/', async (req, res, next) => {
    try {
        const { body } = req;
        const createdOrder = await orderService.createOrder(body);
        
        res.status(HttpCode.CREATED).send(createdOrder);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/v2/orders/{id}:
 *   put:
 *     summary: Update a order by id
 *     tags: [Orders]
 *     description: Returns the updated order according to the received id or message about error
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The string of the order ID to be updated.
 *         schema:
 *           type: string
 *           example: 66004d6a26f7b9219d887696
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Returns updated order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.put('/:id', async (req, res, next) => {
    try {
        const { params, body } = req;
        const updatedOrder = await orderService.updateOrder(params.id, body);
        
        res.send(updatedOrder);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/v2/orders/{id}:
 *   delete:
 *     summary: Delete a order by id
 *     tags: [Orders]
 *     description: Delete a order by id and returns status code 204 without body or message about error
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the order to delete.
 *         schema:
 *           type: string
 *           example: 66004d6a26f7b9219d887696
 *     responses:
 *       204:
 *         description: Returns only status code 204 without body
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await orderService.deleteOrder(id);
        
        res.status(HttpCode.NO_CONTENT).send();
    } catch (err) {
        next(err);
    }
});

export {
    router as orderRoutes
}