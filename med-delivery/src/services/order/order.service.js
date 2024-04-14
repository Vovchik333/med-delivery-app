import { HttpCode } from "../../common/enums/http/http-code.enum.js";
import { UserType } from "../../common/enums/user/user-type.enum.js";
import { cartRepository, orderRepository } from "../../database/repositories/repositories.js";
import HttpError from "../../helpers/error/http.error.js";

const findAllOrders = async (token) => {
    if (token.type !== UserType.ADMIN) {
        throw new HttpError({
            status: HttpCode.UNAUTHORIZED, 
            message: 'Reqular user does not have access to the resource'
        });
    }

    return await orderRepository.getAllWithUserAndCart();
}

const findOrder = async (id) => {
    const foundOrder = await orderRepository.getByIdWithUserAndCart(id);

    if (!foundOrder) {
        throw new HttpError({
            status: HttpCode.NOT_FOUND,
            message: 'not found.'
        });
    }

    return foundOrder;
}

const createOrder = async (payload) => {
    const foundShoppingCart = await cartRepository.getByIdWithItems(payload.shoppingCart);
    const cartTotalSum = foundShoppingCart.items.reduce((acc, cur) => acc + (cur.item.price * cur.quantity), 0);

    payload.finalSum = cartTotalSum;
    
    const createdOrder = await orderRepository.create(payload);

    return createdOrder;
}

const deleteOrder = async (id) => {
    const deletedOrder = await orderRepository.deleteById(id);

    if (!deletedOrder.deletedCount) {
        throw new HttpError({
            status: HttpCode.NOT_FOUND,
            message: 'not found.'
        });
    }
}

export {
    findAllOrders,
    findOrder,
    createOrder,
    deleteOrder
}