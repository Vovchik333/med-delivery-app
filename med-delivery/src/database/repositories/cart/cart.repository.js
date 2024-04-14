import { AbstractRepository } from "../abstract/abstract.repository.js";

class CartRepository extends AbstractRepository {
    constructor(model) {
        super(model);
    }

    getAllWithItems() {
        return this.model
            .find({})
            .populate({
                path: 'items',
                    populate: {
                path: 'item'
                }
            })
            .exec();
    }

    getByIdWithItems(id) {
        return this.model
            .findById(id)
            .populate({
                path: 'items',
                populate: {
                    path: 'item'
                }
            })
            .exec();
    }

    incTotalSum(id, price) {
        return this.model
            .findByIdAndUpdate(
                id, 
                {
                    $inc: { totalSum: price },
                    $set: { updatedAt: new Date() }
                }
            )
            .exec();
    }

    async addItem(payload) {
        const { _id, cartId, quantity, item: { price } } = payload;

        return await this.model
            .findByIdAndUpdate(
                cartId, 
                { 
                    $push: { items: _id },
                    $inc: { totalSum: quantity * price },
                    $set: { updatedAt: new Date() }
                }
            )
            .exec();
    }

    async removeItem(payload) {
        const { _id, cartId, quantity, item: { price } } = payload;

        return await this.model
            .findByIdAndUpdate(
                cartId, 
                {   $pull: { arrayField: { _id } },
                    $inc: { totalSum: -quantity * price },
                    $set: { updatedAt: new Date() }
                }
            )
            .exec();
    }
}

export { 
    CartRepository 
};