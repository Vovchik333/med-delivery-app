import { HttpCode } from "../../common/enums/http/http-code.enum.js";
import { UserType } from "../../common/enums/user/user-type.enum.js";
import { shopRepository } from "../../database/repositories/repositories.js";
import HttpError from "../../helpers/error/http.error.js";

const findAllShops = async () => {
    return await shopRepository.getAll();
}

const findShopWithSortedByPriceMedicines = async (id, query) => {
    let sortByPrice = false;

    if (query.hasOwnProperty('sortByPrice')) {
        sortByPrice = query.sortByPrice === 'true';
    }

    const foundShop = await shopRepository.getOneWithMedicines(id);

    if (!foundShop) {
        throw new HttpError({
            status: HttpCode.NOT_FOUND,
            message: 'not found.'
        });
    }
    
    if (sortByPrice) {
        foundShop.medicines = foundShop.medicines.sort((med, otherMed) => med.price - otherMed.price);
    }
    
    return foundShop;
}

const findShop = async (id) => {
    const foundShop = await shopRepository.getOneWithMedicines(id);

    if (!foundShop) {
        throw new HttpError({
            status: HttpCode.NOT_FOUND,
            message: 'not found.'
        });
    }

    return foundShop;
}

const createShop = async (payload, token) => {
    if (token.type !== UserType.ADMIN) {
        throw new HttpError({
            status: HttpCode.FORBIDDEN, 
            message: 'Reqular user does not have access to the resource'
        });
    }

    const createdShop = await shopRepository.create(payload);
    
    return createdShop;
}

const updateShop = async (id, payload, token) => {
    if (token.type !== UserType.ADMIN) {
        throw new HttpError({
            status: HttpCode.UNAUTHORIZED, 
            message: 'Reqular user does not have access to the resource'
        });
    }

    const updatedShop = await shopRepository.updateById(id, payload);

    if (!updatedShop) {
        throw new HttpError({
            status: HttpCode.NOT_FOUND,
            message: 'not found.'
        });
    }

    return updatedShop;
}

const deleteShop = async (id, token) => {
    if (token.type !== UserType.ADMIN) {
        throw new HttpError({
            status: HttpCode.UNAUTHORIZED, 
            message: 'Reqular user does not have access to the resource'
        });
    }

    const deletedShop = await shopRepository.deleteById(id);

    if (!deletedShop.deletedCount) {
        throw new HttpError({
            status: HttpCode.NOT_FOUND,
            message: 'not found.'
        });
    }
}

export {
    findShopWithSortedByPriceMedicines,
    findAllShops,
    findShop,
    createShop,
    updateShop,
    deleteShop
}