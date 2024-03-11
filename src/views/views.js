import { Router } from "express";
import { shopsView } from "./shops/shops.view.js";
import { shoppingCartView } from "./shopping-cart/shopping-cart.view.js";

const router = Router();

router.use('/', shopsView);
router.use('/shopping-cart', shoppingCartView);

export {
    router as views
}