import { Router } from "express";
import { HttpCode } from "../../../common/enums/http/http-code.enum.js";
import * as cartService from "../../../services/cart/cart.service.js";
import { authorization } from "../../../middlewares/auth/auth.middleware.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The user ID.
 *           example: 28004d6a56f7b9212d837683
 *         items:  
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CartItem'
 *         totalSum:
 *           type: number
 *           description: The user's name.
 *           example: 28.5
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
 *   name: Carts
 *   description: All endpoints for managing shopping carts
 */

const router = Router();

/**
 * @swagger
 * /api/v2/carts:
 *   get:
 *     summary: Get all carts
 *     tags: [Carts]
 *     description: Returns the array of carts or message about error
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns an array of shopping carts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cart'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get(
    '/', 
    authorization, 
    async (req, res, next) => {
        try {
            const { token } = req;
            const foundCarts = await cartService.findAllCarts(token);

            res.send(foundCarts);
        } catch (err) {
            next(err);
        }
    }
);

/**
 * @swagger
 * /api/v2/carts/{id}:
 *   get:
 *     summary: Get a cart by id
 *     tags: [Carts]
 *     description: Returns the cart according to the received id or message about error
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the cart to retrieve.
 *         schema:
 *           type: string
 *           example: 66004d6a26f7b9219d887696
 *     responses:
 *       200:
 *         description: Returns a shopping cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const foundCart = await cartService.findCart(id);

        res.send(foundCart);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/v2/carts:
 *   post:
 *     summary: Create a cart
 *     tags: [Carts]
 *     description: Returns the created cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items: 
 *                 type: array
 *                 example: []
 *     responses:
 *       201:
 *         description: Returns a shopping cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 */
router.post('/', async (req, res, next) => {
    try {
        const { body } = req;
        const createdCart = await cartService.createCart(body);
        
        res.status(HttpCode.CREATED).send(createdCart);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/v2/carts/{id}:
 *   patch:
 *     summary: Update a cart by id
 *     tags: [Carts]
 *     description: Returns the updated cart according to the received id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The string of the cart ID to be updated.
 *         schema:
 *           type: string
 *           example: 66004d6a26f7b9219d887696
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               totalSum: 
 *                 type: number
 *                 example: 9.0001
 *     responses:
 *       200:
 *         description: A shopping cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.patch('/:id', async (req, res, next) => {
    try {
        const { params, body } = req;
        const updatedCart = await cartService.updateCart(params.id, body);

        res.send(updatedCart);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/v2/carts/{id}:
 *   delete:
 *     summary: Delete a cart by id
 *     tags: [Carts]
 *     description: Delete a cart by id and returns status code 204 without body
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the cart to delete.
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
        await cartService.deleteCart(id);

        res.status(HttpCode.NO_CONTENT).send();
    } catch (err) {
        next(err);
    }
});

export {
    router as cartRoutes
}