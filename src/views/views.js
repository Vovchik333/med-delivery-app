import { Router } from "express";
import { shopsView } from "./shops/shops.view.js";

const router = Router();

router.use('/', shopsView);

export {
    router as views
}