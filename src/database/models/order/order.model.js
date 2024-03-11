import { Schema, model } from "mongoose";

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