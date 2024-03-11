import { Router } from "express";
import { shopsRoutes } from "./shop/shop.routes.js";
import { medicineRoutes } from "./medicine/medicine.routes.js";
import { userRoutes } from "./user/user.routes.js";
import { cartRoutes } from "./cart/cart.routes.js";
import { orderRoutes } from "./order/order.routes.js";
import { cartItemRoutes } from "./cart-item/cart-item.routes.js";

const router = Router();

router.use('/shops', shopsRoutes);
router.use('/medicines', medicineRoutes);
router.use('/users', userRoutes);
router.use('/cart-items', cartItemRoutes);
router.use('/carts', cartRoutes);
router.use('/orders', orderRoutes);

export {
    router as routesV1
}
