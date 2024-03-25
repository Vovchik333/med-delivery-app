import { Router } from "express";
import { HttpCode } from "../../../common/enums/http/http-code.enum.js";
import * as medicineService from "../../../services/medicine/medicine.service.js";
import { authorization } from "../../../middlewares/auth/auth.middleware.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Medicine:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The user ID.
 *           example: 66004d6a26f7b9219d887696
 *         name:  
 *           type: string
 *           description: The name of medicine.
 *           example: Lipitor
 *         isFavorite:
 *           type: boolean
 *           description: Is it a favorite medicine
 *           example: true
 *         price:
 *           type: number
 *           description: The price of medicine
 *           example: 9.50
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
 *   name: Medicines
 *   description: All endpoints for managing medicines
 */

const router = Router();

/**
 * @swagger
 * /api/v2/medicines:
 *   get:
 *     summary: Get all medicines
 *     tags: [Medicines]
 *     description: Returns the array of medicines
 *     responses:
 *       200:
 *         description: Returns an array of medicine
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Medicine'
 */
router.get('/', async (req, res, next) => {
    try {
        const foundMedicines = await medicineService.findAllMedicines();
        
        res.send(foundMedicines);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/v2/medicines/{id}:
 *   get:
 *     summary: Get a medicine by id
 *     tags: [Medicines]
 *     description: Returns the medicine according to the received id or message about error
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the medicine to retrieve.
 *         schema:
 *           type: string
 *           example: 66004d6a26f7b9219d887696
 *     responses:
 *       200:
 *         description:  Returns a medicine
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medicine'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const foundMedicine = await medicineService.findMedicine(id);
        
        res.send(foundMedicine);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/v2/medicines:
 *   post:
 *     summary: Create a medicine
 *     tags: [Medicines]
 *     description: Returns the created medicine or message about error
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Medicine'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Returns a medicine
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medicine'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post(
    '/', 
    authorization,
    async (req, res, next) => {
        try {
            const { body, token } = req;
            const createdMedicine = await medicineService.createMedicine(body, token);
            
            res.status(HttpCode.CREATED).send(createdMedicine);
        } catch (err) {
            next(err);
        }
    }
);

/**
 * @swagger
 * /api/v2/medicines/{id}:
 *   put:
 *     summary: Update a medicine by id
 *     tags: [Medicines]
 *     description: Returns the updated medicine according to the received id or message about error
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The string of the medicine ID to be updated.
 *         schema:
 *           type: string
 *           example: 66004d6a26f7b9219d887696
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Medicine'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns updated medicine
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medicine'
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
            const updatedMedicine = await medicineService.updateMedicine(params.id, body, token);
            
            res.send(updatedMedicine);
        } catch (err) {
            next(err);
        }
    }
);

/**
 * @swagger
 * /api/v2/medicines/{id}:
 *   delete:
 *     summary: Delete a medicine by id
 *     tags: [Medicines]
 *     description: Delete a medicine by id and returns status code 204 without body or message about error
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the medicine to delete.
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
            await medicineService.deleteMedicine(params.id, token);
            
            res.status(HttpCode.NO_CONTENT).send();
        } catch (err) {
            next(err);
        }
    }
);

export {
    router as medicineRoutes
}