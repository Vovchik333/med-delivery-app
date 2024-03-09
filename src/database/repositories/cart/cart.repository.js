import { AbstractRepository } from "../abstract/abstract.repository.js";

class CartRepository extends AbstractRepository {
    constructor(model) {
        super(model);
    }
}

export { 
    CartRepository 
};