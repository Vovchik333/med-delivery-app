import { HttpCode } from "../../common/enums/http/http-code.enum.js";
import { UserType } from "../../common/enums/user/user-type.enum.js";
import { cartItemRepository, cartRepository } from "../../database/repositories/repositories.js";
import HttpError from "../../helpers/error/http.error.js";
import { findMedicine } from "../medicine/medicine.service.js";

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
    const { item, cartId } = payload;

    const foundCartItem = await cartItemRepository.getByItemAndCartId(item, cartId);

    if (foundCartItem) {
        const updatedCartItem = await cartItemRepository.incQuantity(foundCartItem._id);
        await cartRepository.incTotalSum(cartId, foundCartItem.item.price);

        return updatedCartItem;
    } else {
        const createdCartItem = await cartItemRepository.create(payload);
        const { _id, quantity } = createdCartItem;

        payload.item = await findMedicine(payload.item);
        await cartRepository.addItem({ ...payload, _id, quantity });

        return createdCartItem;
    }
}

const updateCartItem = async (id, payload) => {
    const oldCartItem = await cartItemRepository.getByIdWithItem(id);
    const updatedCartItem = await cartItemRepository.updateById(id, { ...payload });

    if (!updatedCartItem) {
        throw new HttpError({
            status: HttpCode.NOT_FOUND,
            message: 'not found.'
        });
    }

    const { quantity: oldQuantity } = oldCartItem;
    const { quantity: newQuantity } = updatedCartItem;

    await cartRepository.incTotalSum(updatedCartItem.cartId, ((newQuantity - oldQuantity) * oldCartItem.item.price));

    return updatedCartItem;
}

const deleteCartItem = async (id) => {
    const deletedCartItem = await cartItemRepository.deleteOneAndReturnItem(id);

    if (!deletedCartItem) {
        throw new HttpError({
            status: HttpCode.NOT_FOUND,
            message: 'not found.'
        });
    }

    await cartRepository.removeItem(deletedCartItem);
}

export {
    findAllCartItems,
    findCartItem,
    updateCartItem,
    createCartItem,
    deleteCartItem
}