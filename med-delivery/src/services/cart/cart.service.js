import { HttpCode } from "../../common/enums/http/http-code.enum.js";
import { UserType } from "../../common/enums/user/user-type.enum.js";
import { cartItemRepository, cartRepository } from "../../database/repositories/repositories.js";
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

    return foundCart;
}

const createCart = async (payload) => {
    payload.totalSum = payload.items.reduce((acc, cur) => acc + (cur.item.price * cur.quantity), 0);
    payload.items = payload.items.map(elem => ({ item: elem.item._id, quantity: elem.quantity }));

    const createdCart = await cartRepository.create(payload);
    
    return createdCart;
}

const deleteCart = async (id) => {
    const deletedCart = await cartRepository.deleteById(id);

    if (!deletedCart.deletedCount) {
        throw new HttpError({
            status: HttpCode.NOT_FOUND,
            message: 'not found.'
        });
    }

    await cartItemRepository.deleteAllByCartId(id);
}

export {
    findAllCarts,
    findCart,
    createCart,
    deleteCart
}