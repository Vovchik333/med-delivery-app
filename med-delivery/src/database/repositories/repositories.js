import { cartItemModel } from "../models/cart-item/cart-item.model.js";
import { cartModel } from "../models/cart/cart.model.js";
import { medicineModel } from "../models/medicine/medicine.model.js";
import { orderModel } from "../models/order/order.model.js";
import { shopModel } from "../models/shop/shop.model.js";
import { CartItemRepository } from "./cart-item/cart-item.repository.js";
import { CartRepository } from "./cart/cart.repository.js";
import { MedicineRepository } from "./medicine/medicine.repository.js";
import { OrderRepository } from "./order/order.repository.js";
import { ShopRepository } from "./shop/shop.repository.js";

const medicineRepository = new MedicineRepository(medicineModel);
const shopRepository = new ShopRepository(shopModel);
const cartRepository = new CartRepository(cartModel);
const cartItemRepository = new CartItemRepository(cartItemModel);
const orderRepository = new OrderRepository(orderModel);

export {
    medicineRepository,
    shopRepository,
    cartRepository,
    cartItemRepository,
    orderRepository
}