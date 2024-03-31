import { Schema, model } from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The user ID
 *           example: 94004b6a26t7c9219a887627
 *         cartId:
 *           type: string
 *           description: The shopping cart ID
 *           example: 24004b8a26t7c9219a887629
 *         item:
 *           $ref: '#/components/schemas/Medicine'
 *         quantity:
 *           type: integer
 *           description: quantity of items
 *           example: 1
 *         updatedAt:
 *           type: string
 *           description: time of the last update
 *           example: 2024-03-24T15:57:30.439+00:00
 *         createdAt:
 *           type: string
 *           description: creation time
 *           example: 2024-03-24T15:57:30.439+00:00
 *     CartItemRequestData:
 *       type: object
 *       properties:
 *         cartId:
 *           type: string
 *           description: The shopping cart ID
 *           example: 660866bcc05db768d6df0e5c
 *         item:
 *           type: string
 *           description: The item ID
 *           example: 660866bcc05db768d6df0e5c
 *         quantity:
 *           type: integer
 *           description: quantity of items
 *           example: 1
 */

const cartItemSchema = new Schema({
    cartId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Medicine'
    },
    quantity: {
        type: Number,
        default: () => 1
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

const cartItemModel = model('CartItem', cartItemSchema, 'cartItems');

export { cartItemModel };