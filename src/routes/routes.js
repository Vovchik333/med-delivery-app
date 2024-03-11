import { Router } from "express";
import { routesV1 } from "./v1/routes.js";
import { routesV2 } from "./v2/routes.js";

const router = Router();

router.use('/v1', routesV1);
router.use('/v2', routesV2);

export {
    router as routes
}
