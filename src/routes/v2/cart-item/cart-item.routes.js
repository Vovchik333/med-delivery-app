import { Router } from "express";
import { HttpCode } from "../../../common/enums/http/http-code.enum.js";
import * as cartItemService from "../../../services/cart-item/cart-item.service.js";
import { authorization } from "../../../middlewares/auth/auth.middleware.js";

const router = Router();

router.get(
    '/', 
    authorization, 
    async (req, res, next) => {
        try {
            const { token } = req;
            const foundCartItems = await cartItemService.findAllCartItems(token);

            res.send(foundCartItems);
        } catch (err) {
            next(err);
        }
    }
);

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const foundCartItem = await cartItemService.findCartItem(id);

        res.send(foundCartItem);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { body } = req;
        const createdCartItem = await cartItemService.createCartItem(body);
        
        res.status(HttpCode.CREATED).send(createdCartItem);
    } catch (err) {
        next(err);
    }
});

router.patch('/:id', async (req, res, next) => {
    try {
        const { params, body } = req;
        const updatedCartItem = await cartItemService.updateCartItem(params.id, body);

        res.send(updatedCartItem);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { params, body } = req;
        const updatedCartItem = await cartItemService.updateCartItem(params.id, body);

        res.send(updatedCartItem);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await cartItemService.deleteCartItem(id);

        res.status(HttpCode.NO_CONTENT).send();
    } catch (err) {
        next(err);
    }
});

export {
    router as cartItemRoutes
}