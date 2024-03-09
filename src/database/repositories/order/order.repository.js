import { AbstractRepository } from "../abstract/abstract.repository.js";

class OrderRepository extends AbstractRepository {
    constructor(model) {
        super(model);
    }
}

export { 
    OrderRepository 
};