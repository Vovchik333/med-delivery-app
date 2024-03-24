import { HttpCode } from "../../common/enums/http/http-code.enum.js";
import { UserType } from "../../common/enums/user/user-type.enum.js";
import { medicineRepository } from "../../database/repositories/repositories.js";
import HttpError from "../../helpers/error/http.error.js";

const findAllMedicines = async () => {
    return await medicineRepository.getAll();
}

const findMedicine = async (id) => {
    const foundMedicine = await medicineRepository.getById(id);

    if (!foundMedicine) {
        throw new HttpError({
            status: HttpCode.NOT_FOUND,
            message: 'not found.'
        });
    }

    return foundMedicine;
}

const createMedicine = async (payload, token) => {
    if (token.type !== UserType.ADMIN) {
        throw new HttpError({
            status: HttpCode.UNAUTHORIZED, 
            message: 'Reqular user does not have access to the resource'
        });
    }
    
    const createdMedicine = await medicineRepository.create(payload);
    
    return createdMedicine;
}

const updateMedicine = async (id, payload, token) => {
    if (token.type !== UserType.ADMIN) {
        throw new HttpError({
            status: HttpCode.UNAUTHORIZED, 
            message: 'Reqular user does not have access to the resource'
        });
    }

    const updatedMedicine = await medicineRepository.updateById(id, payload);

    if (!updatedMedicine) {
        throw new HttpError({
            status: HttpCode.NOT_FOUND,
            message: 'not found.'
        });
    }

    return updatedMedicine;
}

const deleteMedicine = async (id, token) => {
    if (token.type !== UserType.ADMIN) {
        throw new HttpError({
            status: HttpCode.UNAUTHORIZED, 
            message: 'Reqular user does not have access to the resource'
        });
    }

    const deletedMedicine = await medicineRepository.deleteById(id);

    if (!deletedMedicine.deletedCount) {
        throw new HttpError({
            status: HttpCode.NOT_FOUND,
            message: 'not found.'
        });
    }
}

export {
    findAllMedicines,
    findMedicine,
    createMedicine,
    updateMedicine,
    deleteMedicine
}