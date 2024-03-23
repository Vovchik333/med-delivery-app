import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'CartItem'
    }],
    totalSum: {
        type: Number
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const cartModel = model('Cart', cartSchema, 'carts');

export { cartModel };