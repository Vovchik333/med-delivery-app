import { Schema, model } from "mongoose";

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