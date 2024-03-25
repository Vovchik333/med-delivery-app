import { Router } from "express";
import { HttpCode } from "../../../common/enums/http/http-code.enum.js";
import * as shopService from "../../../services/shop/shop.service.js";
import { authorization } from "../../../middlewares/auth/auth.middleware.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Shop:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The shop ID
 *           example: 66004d6a26f7b9219d887696
 *         name:
 *           type: string
 *           description: Name of pharmacy (shop)
 *           example: HealthHub
 *         medicines:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Medicine'
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
 *   name: Shops
 *   description: All endpoints for managing shops
 */

const router = Router();

/**
 * @swagger
 * /api/v2/shops:
 *   get:
 *     summary: Get all shops
 *     tags: [Shops]
 *     description: Returns the array of shops or message about error
 *     responses:
 *       200:
 *         description: Returns an array of shops
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Shop'
 */
router.get('/', async (req, res, next) => {
    try {
        const foundShops = await shopService.findAllShops();

        res.send(foundShops);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/v2/shops/{id}:
 *   get:
 *     summary: Get a shop by id
 *     tags: [Shops]
 *     description: Returns the shop according to the received id or message about error
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the shop to retrieve.
 *         schema:
 *           type: string
 *           example: 66004d6a26f7b9219d887696
 *       - in: query
 *         name: sortByPrice
 *         description: Boolean value that indicates whether to sort medicines by price
 *         schema:
 *           type: boolean
 *           example: true
 *     responses:
 *       200:
 *         description:  Returns a shop
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shop'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get('/:id', async (req, res, next) => {
    try {
        const { params, query } = req;
        const foundShop = await shopService.findShopWithSortedByPriceMedicines(params.id, query);

        res.send(foundShop);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/v2/shops:
 *   post:
 *     summary: Create a shop
 *     tags: [Shops]
 *     description: Returns the created shop or message about error
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Shop'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Returns a shop
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shop'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post(
    '/', 
    authorization,
    async (req, res, next) => {
        try {
            const { body, token } = req;
            const createdShop = await shopService.createShop(body, token);
            
            res.status(HttpCode.CREATED).send(createdShop);
        } catch (err) {
            next(err);
        }
    }
);

/**
 * @swagger
 * /api/v2/shops/{id}:
 *   put:
 *     summary: Update a shop by id
 *     tags: [Shops]
 *     description: Returns the updated shop according to the received id or message about error
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The string of the shop ID to be updated.
 *         schema:
 *           type: string
 *           example: 66004d6a26f7b9219d887696
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Shop'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns updated shop
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shop'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.put(
    '/:id', 
    authorization,
    async (req, res, next) => {
        try {
            const { params, body, token } = req;
            const updatedShop = await shopService.updateShop(params.id, body, token);
            
            res.send(updatedShop);
        } catch (err) {
            next(err);
        }
    }
);

/**
 * @swagger
 * /api/v2/shops/{id}:
 *   delete:
 *     summary: Delete a shop by id
 *     tags: [Shops]
 *     description: Delete a shop by id and returns status code 204 without body or message about error
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the shop to delete.
 *         schema:
 *           type: string
 *           example: 66004d6a26f7b9219d887696
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Returns only status code 204 without body
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.delete(
    '/:id', 
    authorization,
    async (req, res, next) => {
        try {
            const { params, token } = req;
            await shopService.deleteShop(params.id, token);
            
            res.status(HttpCode.NO_CONTENT).send();
        } catch (err) {
            next(err);
        }
    }
);

export {
    router as shopsRoutes
}

