import { Router } from "express";
import { HttpCode } from "../../../common/enums/http/http-code.enum.js";
import * as cartService from "../../../services/cart/cart.service.js";

/**
 * @swagger
 * tags:
 *   name: Carts
 *   description: All endpoints for managing shopping carts
 */

const router = Router();

/**
 * @swagger
 * /api/v1/carts/{id}:
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
 * /api/v1/carts:
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
 * /api/v1/carts/{id}:
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