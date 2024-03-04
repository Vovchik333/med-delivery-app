import { Schema, model } from "mongoose";

const shopSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    medicines: [{
        type: Schema.Types.ObjectId
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