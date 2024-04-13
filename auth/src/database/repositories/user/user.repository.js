import { AbstractRepository } from "../abstract/abstract.repository.js";

class UserRepository extends AbstractRepository {
    constructor(model) {
        super(model);
    }

    getByEmail(email) {
        return this.model
            .findOne({ email })
            .exec();
    }
}

export { 
    UserRepository 
};