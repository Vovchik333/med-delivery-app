import { Schema, model } from "mongoose";

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
 *     CartRequestData:
 *       type: object
 *       properties:
 *         items:  
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CartItem'
 *         totalSum:
 *           type: number
 *           description: The user's name.
 *           example: 0.00
 */

const cartSchema = new Schema({
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'CartItem'
    }],
    totalSum: {
        type: Number,
        required: true
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

const cartModel = model('Cart', cartSchema, 'carts');

export { cartModel };