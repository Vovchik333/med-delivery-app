import { 
    cartItemRepository, 
    cartRepository, 
    orderRepository, 
    shopRepository 
} from "../repositories/repositories.js";
import { createMedicines } from "./add-medicines.js";

const createShops = async () => {
    await shopRepository.deleteAll();
    await cartRepository.deleteAll();
    await orderRepository.deleteAll();
    await cartItemRepository.deleteAll();
    
    const medicines = await createMedicines();

    shopRepository.create({ name: 'HealthHub', medicines });
    shopRepository.create({ name: 'MediSolutions', medicines: [medicines[0], medicines[1], medicines[3]] });
    shopRepository.create({ name: 'VitalMed', medicines: [medicines[0], medicines[1], medicines[3], medicines[4]] });
}

export {
    createShops
}

