import { AbstractRepository } from "../abstract/abstract.repository.js";

class CartRepository extends AbstractRepository {
    constructor(model) {
        super(model);
    }

    getByIdWithItems(id) {
        return this.model.findById(id).populate({
            path: 'items',
            populate: {
              path: 'item'
            }
          }).exec();
    }

    addItem(id, payload) {
        return this.model.findByIdAndUpdate(
            id, 
            { 
                $push: { 
                    items: payload._id
                },
                $inc: { totalSum: payload.quantity * payload.item.price },
                $set: {
                    updatedAt: new Date()
                }
            }
        ).exec();
    }
}

export { 
    CartRepository 
};