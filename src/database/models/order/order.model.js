import { Schema, model } from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The order ID.
 *           example: 66004d6a26f7b9219d887696
 *         user:
 *           $ref: '#/components/schemas/User'
 *         shoppingCart:
 *           $ref: '#/components/schemas/Cart'
 *         finalSum:
 *           type: number
 *           description: Final sum
 *           example: 27.50
 *         updatedAt:
 *           type: string
 *           description: time of the last update
 *           example: 2024-03-24T15:57:30.439+00:00
 *         createdAt:
 *           type: string
 *           description: creation time
 *           example: 2024-03-24T15:57:30.439+00:00
 *     OrderRequestData:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           description: The user ID
 *           example: 66004d6a26f7b9219d887696
 *         shoppingCart:
 *           type: string
 *           description: The chopping cart ID
 *           example: 66004d6a26f7b9219d887696
 */

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    shoppingCart: {
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    },
    finalSum: {
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

const orderModel = model('Order', orderSchema, 'orders');

export { orderModel };