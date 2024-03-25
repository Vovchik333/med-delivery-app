import { Router } from "express";
import { authorization } from "../../../middlewares/auth/auth.middleware.js";
import * as userService from "../../../services/user/user.service.js";
import { HttpCode } from "../../../common/enums/http/http-code.enum.js";

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   responses:
 *     UnauthorizedError:
 *       description: Returns message about unauthorized error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: String
 *                 description: message about unauthorized error
 *                 example: "Not Authorized"
 *     NotFoundError:
 *       description: Returns message about object not found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: String
 *                 description: message about error
 *                 example: "not found."
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The user ID
 *           example: 66004d6a26f7b9219d887696
 *         name:
 *           type: string
 *           description: User name
 *           example: Vova
 *         email:
 *           type: string
 *           description: User email address
 *           example: vova234@gmail.com
 *         phone:
 *           type: string
 *           description: User phone number
 *           example: 380975647321
 *         address:
 *           type: string
 *           description: Address of the user's place of residence
 *           example: Naukova Street 34
 *         type:
 *           type: string
 *           description: The user type. It can be "admin" or "regular"
 *           example: admin
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
 *   name: Users
 *   description: All endpoints for managing users
 */

const router = Router();

/**
 * @swagger
 * /api/v2/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     description: Returns the array of users or message about error
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description:  Returns an array of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get(
    '/',
    authorization, 
    async (req, res, next) => {
        try {
            const { token } = req;
            const foundUsers = await userService.findAllUsers(token);
            
            res.send(foundUsers);
        } catch (err) {
            next(err);
        }
    }
);

/**
 * @swagger
 * /api/v2/users/{id}:
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
 * /api/v2/users:
 *   post:
 *     summary: Create a user
 *     tags: [Users]
 *     description: Returns the created user or message about error
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/User'
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
 * /api/v2/users/{id}:
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
 *             $ref: '#/components/schemas/User'
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
 * /api/v2/users/{id}:
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