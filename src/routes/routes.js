import { Router } from "express";
import { shopsRoutes } from "./shops/shops.routes.js";
import { medicineRoutes } from "./medicine/medicine.route.js";

const router = Router();

router.use('/shops', shopsRoutes);
router.use('/medicines', medicineRoutes);

export {
    router as routes
}
