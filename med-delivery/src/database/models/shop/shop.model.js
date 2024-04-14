import { Schema, model } from "mongoose";

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
 *     ShopRequestData:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of pharmacy (shop)
 *           example: HealthHub
 *         medicines:
 *           type: array
 *           items:
 *             type: string
 *             description: The medicine ID
 *             example: 66004d6a26f7b9219d887696
 *             
 */

const shopSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    medicines: [{
        type: Schema.Types.ObjectId,
        ref: 'Medicine'
    }],
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const shopModel = model('Shop', shopSchema, 'shops');

export { shopModel };