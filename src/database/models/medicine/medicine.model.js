import { Schema, model } from "mongoose";

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
 *           example: 680866bcc05db768d6df0e5c
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
 *     MedicineRequestData:
 *       type: object
 *       properties:
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
 */

const medicineSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    isFavorite: {
        type: Boolean,
        required: true
    },
    price: {
        type: Number,
        default: () => false
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const medicineModel = model('Medicine', medicineSchema, 'medicines');

export { medicineModel };