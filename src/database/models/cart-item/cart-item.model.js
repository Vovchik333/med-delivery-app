import { Schema, model } from "mongoose";

const cartItemSchema = new Schema({
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Medician'
    },
    quantity: {
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

const cartItemModel = model('CartItem', cartItemSchema, 'cartItems');

export { cartItemModel };