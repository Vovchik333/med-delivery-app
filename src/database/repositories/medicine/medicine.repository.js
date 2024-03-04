import { AbstractRepository } from "../abstract/abstract.repository.js";

class MedicineRepository extends AbstractRepository {
    constructor(model) {
        super(model);
    }
}

export { 
    MedicineRepository 
};