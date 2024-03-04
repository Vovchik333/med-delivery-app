import { AbstractRepository } from "../abstract/abstract.repository.js";

class ShopRepository extends AbstractRepository {
    constructor(model) {
        super(model);
    }

    getAllWithMedicines() {
        return this.model.find({}).populate('medicines').exec();
    }
}

export { 
    ShopRepository 
};