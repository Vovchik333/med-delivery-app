import { AbstractRepository } from "../abstract/abstract.repository.js";

class OrderRepository extends AbstractRepository {
    constructor(model) {
        super(model);
    }

    getAllWithUserAndCart() {
        return this.model
            .find({})
            .populate('user')
            .populate({
                path: 'shoppingCart',
                populate: {
                    path: 'items',
                    populate: {
                        path: 'item'
                    }
                }
            })
            .exec();
    }

    getByIdWithUserAndCart(id) {
        return this.model
            .findById(id)
            .populate('user')
            .populate({
                path: 'shoppingCart',
                populate: {
                    path: 'items',
                    populate: {
                        path: 'item'
                    }
                }
            })
            .exec();
    }
}

export { 
    OrderRepository 
};