import { Router } from "express";
import * as authService from "../../../services/auth/auth.service.js";
import { HttpCode } from "../../../common/enums/http/http-code.enum.js";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: All endpoints for managing authorization
 */

const router = Router();

/**
 * @swagger
 * /api/v2/auth/sign-up:
 *   post:
 *     summary: User registration in the system
 *     tags: [Auth]
 *     description: Returns the created user with token or message about error
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/SignUpData'
 *     responses:
 *       200:
 *         description: Returns a user with token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post('/sign-up', async (req, res, next) => {
    try {
        const { body } = req;
        const createdUserWithToken = await authService.signUp(body);

        res.status(HttpCode.OK).send(createdUserWithToken);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/v2/auth/sign-in:
 *   post:
 *     summary: User login to the system
 *     tags: [Auth]
 *     description: Returns the created user with token or message about error
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/SignInData'
 *     responses:
 *       200:
 *         description: Returns a user with token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post('/sign-in', async (req, res, next) => {
    try {
        const { body } = req;
        const createdUserWithToken = await authService.signIn(body);

        res.status(HttpCode.OK).send(createdUserWithToken);
    } catch (err) {
        next(err);
    }
});

export {
    router as authRoutes
}