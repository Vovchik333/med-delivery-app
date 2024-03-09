import { AbstractRepository } from "../abstract/abstract.repository.js";

class CartItemRepository extends AbstractRepository {
    constructor(model) {
        super(model);
    }
}

export { 
    CartItemRepository 
};