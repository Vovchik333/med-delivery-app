import { HttpCode } from "../../common/enums/http/http-code.enum.js";
import { UserType } from "../../common/enums/user/user-type.enum.js";
import { cartRepository } from "../../database/repositories/repositories.js";
import HttpError from "../../helpers/error/http.error.js";

const findAllCarts = async (token) => {
    if (token.type !== UserType.ADMIN) {
        throw new HttpError({
            status: HttpCode.UNAUTHORIZED, 
            message: 'Reqular user does not have access to the resource'
        });
    }

    return await cartRepository.getAllWithItems();
}

const findCart = async (id) => {
    const foundCart = await cartRepository.getByIdWithItems(id);

    if (!foundCart) {
        throw new HttpError({
            status: HttpCode.NOT_FOUND,
            message: 'not found.'
        });
    }
    
    foundCart.totalSum = foundCart.items.reduce((acc, cur) => acc + (cur.item.price * cur.quantity), 0);

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
    findAllCarts,
    findCart,
    createCart,
    updateCart,
    deleteCart
}