import { Schema, model } from "mongoose";

const medicineSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
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

const medicineModel = model('Medicine', medicineSchema, 'medicines');

export { medicineModel };