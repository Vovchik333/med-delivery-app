import { Router } from "express";
import { shopsRoutes } from "./shops/shops.routes.js";

const router = Router();

router.use('/shops', shopsRoutes);

export {
    router as routes
}
