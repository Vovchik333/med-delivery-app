import { AbstractRepository } from "../abstract/abstract.repository.js";

class CartItemRepository extends AbstractRepository {
    constructor(model) {
        super(model);
    }

    getAllWithItem() {
        return this.model.find({}).populate('item').exec();
    }

    getByIdWithItem(id) {
        return this.model.findById(id).populate('item').exec();
    }
}

export { 
    CartItemRepository 
};