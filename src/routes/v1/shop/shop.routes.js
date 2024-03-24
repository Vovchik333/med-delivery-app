import { Router } from "express";
import { HttpCode } from "../../../common/enums/http/http-code.enum.js";
import * as shopService from "../../../services/shop/shop.service.js";
import { authorization } from "../../../middlewares/auth/auth.middleware.js";

const router = Router();

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const foundShop = await shopService.findShop(id);

        res.send(foundShop);
    } catch (err) {
        next(err);
    }
});

router.post(
    '/', 
    authorization,
    async (req, res, next) => {
        try {
            const { body, token } = req;
            const createdShop = await shopService.createShop(body, token);
            
            res.status(HttpCode.CREATED).send(createdShop);
        } catch (err) {
            next(err);
        }
    }
);

router.patch(
    '/:id', 
    authorization,
    async (req, res, next) => {
        try {
            const { params, body, token } = req;
            const updatedShop = await shopService.updateShop(params.id, body, token);
            
            res.send(updatedShop);
        } catch (err) {
            next(err);
        }
    }
);

router.put(
    '/:id', 
    authorization,
    async (req, res, next) => {
        try {
            const { params, body, token } = req;
            const updatedShop = await shopService.updateShop(params.id, body, token);
            
            res.send(updatedShop);
        } catch (err) {
            next(err);
        }
    }
);

router.delete(
    '/:id', 
    authorization,
    async (req, res, next) => {
        try {
            const { params, token } = req;
            await shopService.deleteShop(params.id, token);
            
            res.status(HttpCode.NO_CONTENT).send();
        } catch (err) {
            next(err);
        }
    }
);

export {
    router as shopsRoutes
}
