import { medicineRepository } from "../repositories/repositories.js"

const createMedicines = async () => {
    await medicineRepository.deleteAll();

    const medicationIdentifiers = [
        (await medicineRepository.create({ name: 'Lipitor', price: 9.00, isFavorite: false }))._id,
        (await medicineRepository.create({ name: 'Advil', price: 10.00, isFavorite: false }))._id,
        (await medicineRepository.create({ name: 'Zoloft', price: 16.00, isFavorite: false }))._id,
        (await medicineRepository.create({ name: 'Tylenol', price: 15.00, isFavorite: false }))._id,
        (await medicineRepository.create({ name: 'Crestor', price: 40.00, isFavorite: false }))._id
    ];

    return medicationIdentifiers;
}

export {
    createMedicines
}