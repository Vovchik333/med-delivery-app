import { HttpCode } from "../../common/enums/http/http-code.enum.js";
import { cartRepository } from "../../database/repositories/repositories.js";
import HttpError from "../../helpers/error/http.error.js";

const findCart = async (id) => {
    const foundCart = await cartRepository.getByIdWithItems(id);
    foundCart.totalSum = foundCart.items.reduce((acc, cur) => acc + (cur.item.price * cur.quantity), 0);
    
    if (!foundCart) {
        throw new HttpError({
            status: HttpCode.NOT_FOUND,
            message: 'not found.'
        });
    }

    return foundCart;
}

const createCart = async (payload) => {
    payload.items = payload.items.map(elem => ({ item: elem.item._id, quantity: elem.quantity }));

    const createdCart = await cartRepository.create(payload);
    
    return createdCart;
}

const updateCart = async (id, payload) => {
    const updatedCart = await cartRepository.updateById(id, payload);

    if (!updatedCart) {
        throw new HttpError({
            status: HttpCode.NOT_FOUND,
            message: 'not found.'
        });
    }

    return updatedCart;
}

const deleteCart = async (id) => {
    const deletedCart = await cartRepository.deleteById(id);

    if (!deletedCart.deletedCount) {
        throw new HttpError({
            status: HttpCode.NOT_FOUND,
            message: 'not found.'
        });
    }
}

export {
    findCart,
    createCart,
    updateCart,
    deleteCart
}