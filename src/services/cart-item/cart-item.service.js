import { HttpCode } from "../../common/enums/http/http-code.enum.js";
import { UserType } from "../../common/enums/user/user-type.enum.js";
import { cartItemRepository, cartRepository } from "../../database/repositories/repositories.js";
import HttpError from "../../helpers/error/http.error.js";

const findAllCartItems = async (token) => {
    if (token.type !== UserType.ADMIN) {
        throw new HttpError({
            status: HttpCode.UNAUTHORIZED, 
            message: 'Reqular user does not have access to the resource'
        });
    }

    return await cartItemRepository.getAllWithItem();
}

const findCartItem = async (id) => {
    const foundCartItem = await cartItemRepository.getByIdWithItem(id);

    if (!foundCartItem) {
        throw new HttpError({
            status: HttpCode.NOT_FOUND,
            message: 'not found.'
        });
    }

    return foundCartItem;
}

const createCartItem = async (payload) => {
    const { cartId, cartItem } = payload;
    const createdCartItem = await cartItemRepository.create(cartItem);
    const { _id, quantity } = createdCartItem

    cartRepository.addItem(cartId, { _id, quantity, item: cartItem.item });
    
    return createdCartItem;
}

const updateCartItem = async (id, payload) => {
    const updatedCartItem = await cartItemRepository.updateById(id, payload);

    if (!updatedCartItem) {
        throw new HttpError({
            status: HttpCode.NOT_FOUND,
            message: 'not found.'
        });
    }

    return updatedCartItem;
}

const deleteCartItem = async (id) => {
    const deletedCartItem = await cartItemRepository.deleteById(id);

    if (!deletedCartItem.deletedCount) {
        throw new HttpError({
            status: HttpCode.NOT_FOUND,
            message: 'not found.'
        });
    }
}

export {
    findAllCartItems,
    findCartItem,
    createCartItem,
    updateCartItem,
    deleteCartItem
}