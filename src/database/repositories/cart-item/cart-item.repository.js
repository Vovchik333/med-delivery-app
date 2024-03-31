import { AbstractRepository } from "../abstract/abstract.repository.js";

class CartItemRepository extends AbstractRepository {
    constructor(model) {
        super(model);
    }

    getAllWithItem() {
        return this.model
            .find({})
            .populate('item')
            .exec();
    }

    getByIdWithItem(id) {
        return this.model
            .findById(id)
            .populate('item')
            .exec();
    }

    getByItemAndCartId(item, cartId) {
        return this.model
            .findOne({ item, cartId })
            .populate('item')
            .exec();
    }

    async deleteOneAndReturnItem(id) {
        const options = {
            new: true
        };

        return await this.model
            .findByIdAndDelete(id, options)
            .populate('item')
            .exec();
    }

    incQuantity(id) {
        return this.model
            .findByIdAndUpdate(
                id, 
                {
                    $inc: { quantity: 1 },
                    $set: { updatedAt: new Date() }
                },
                { new: true }
            )
            .exec();
    }

    deleteAllByCartId(cartId) {
        return this.model
            .deleteMany({cartId})
            .exec();
    }
}

export { 
    CartItemRepository 
};