import { Router } from "express";
import { HttpCode } from "../../../common/enums/http/http-code.enum.js";
import * as cartItemService from "../../../services/cart-item/cart-item.service.js";
import { authorization } from "../../../middlewares/auth/auth.middleware.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The user ID.
 *           example: 94004b6a26t7c9219a887627
 *         item:
 *           $ref: '#/components/schemas/Medicine'
 *         quantity:
 *           type: integer
 *           description: quantity of items
 *           example: 3
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
 *   name: CartItems
 *   description: All endpoints for managing cart items
 */

const router = Router();

/**
 * @swagger
 * /api/v2/cart-items:
 *   get:
 *     summary: Get all cart items
 *     tags: [CartItems]
 *     description: Returns the array of cart items or message about error
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns an array of shopping cart items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CartItem'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get(
    '/', 
    authorization, 
    async (req, res, next) => {
        try {
            const { token } = req;
            const foundCartItems = await cartItemService.findAllCartItems(token);

            res.send(foundCartItems);
        } catch (err) {
            next(err);
        }
    }
);

/**
 * @swagger
 * /api/v2/cart-items/{id}:
 *   get:
 *     summary: Get a cart item by id
 *     tags: [CartItems]
 *     description: Returns the cart item according to the received id or message about error
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the cart item to retrieve.
 *         schema:
 *           type: string
 *           example: 66004d6a26f7b9219d887696
 *     responses:
 *       200:
 *         description:  Returns a shopping cart item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartItem'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const foundCartItem = await cartItemService.findCartItem(id);

        res.send(foundCartItem);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/v2/cart-items:
 *   post:
 *     summary: Create a cart item
 *     tags: [CartItems]
 *     description: Returns the created cart item or message about error
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                cartItem:
 *                  $ref: '#/components/schemas/CartItem'
 *                cartId:
 *                  type: string 
 *                  example: 65ff50e03f2149c0c6fbf373
 *     responses:
 *       201:
 *         description: Returns a shopping cart item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartItem'
 */
router.post('/', async (req, res, next) => {
    try {
        const { body } = req;
        const createdCartItem = await cartItemService.createCartItem(body);
        
        res.status(HttpCode.CREATED).send(createdCartItem);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/v2/cart-items/{id}:
 *   patch:
 *     summary: Update a cart item by id
 *     tags: [CartItems]
 *     description: Returns the updated cart item according to the received id or message about error
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The string of the cart item ID to be updated.
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
 *               quantity: 
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Returns updated cart item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartItem'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.patch('/:id', async (req, res, next) => {
    try {
        const { params, body } = req;
        const updatedCartItem = await cartItemService.updateCartItem(params.id, body);

        res.send(updatedCartItem);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/v2/cart-items/{id}:
 *   delete:
 *     summary: Delete a cart item by id
 *     tags: [CartItems]
 *     description: Delete a cart item by id and returns status code 204 without body or message about error
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the cart item to delete.
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
        await cartItemService.deleteCartItem(id);

        res.status(HttpCode.NO_CONTENT).send();
    } catch (err) {
        next(err);
    }
});

export {
    router as cartItemRoutes
}