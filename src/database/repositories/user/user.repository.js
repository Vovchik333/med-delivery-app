import { AbstractRepository } from "../abstract/abstract.repository.js";

class UserRepository extends AbstractRepository {
    constructor(model) {
        super(model);
    }
}

export { 
    UserRepository 
};