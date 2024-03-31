import { Router } from "express";
import { authorization } from "../../../middlewares/auth/auth.middleware.js";
import * as userService from "../../../services/user/user.service.js";
import { HttpCode } from "../../../common/enums/http/http-code.enum.js";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: All endpoints for managing users
 */

const router = Router();

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get a user by id
 *     tags: [Users]
 *     description: Returns the user according to the received id or message about error
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the user to retrieve.
 *         schema:
 *           type: string
 *           example: 66004d6a26f7b9219d887696
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description:  Returns a user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get(
    '/:id', 
    authorization,
    async (req, res, next) => {
        try {
            const { params, token } = req;
            const foundUser = await userService.findUser(params.id, token);
            
            res.send(foundUser);
        } catch (err) {
            next(err);
        }
    }
);

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create a user
 *     tags: [Users]
 *     description: Returns the created user or message about error
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/UserRequestData'
 *     responses:
 *       201:
 *         description: Returns a user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post('/', async (req, res, next) => {
    try {
        const { body } = req;
        const createdUser = await userService.createUser(body);

        res.status(HttpCode.CREATED).send(createdUser);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Update a user by id
 *     tags: [Users]
 *     description: Returns the updated user according to the received id or message about error
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The string of the user ID to be updated.
 *         schema:
 *           type: string
 *           example: 66004d6a26f7b9219d887696
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRequestData'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns updated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
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
            const updatedUser = await userService.updateUser(params.id, body, token);
            
            res.send(updatedUser);
        } catch (err) {
            next(err);
        }
    }
);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Delete a user by id
 *     tags: [Users]
 *     description: Delete a user by id and returns status code 204 without body or message about error
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the user to delete.
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
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.delete(
    '/:id', 
    authorization,
    async (req, res, next) => {
        try {
            const { params, token } = req;
            await userService.deleteUser(params.id, token);
            
            res.status(HttpCode.NO_CONTENT).send();
        } catch (err) {
            next(err);
        }
    }
);

export {
    router as userRoutes
}