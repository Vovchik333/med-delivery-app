import { Router } from "express";
import { HttpCode } from "../../../common/enums/http/http-code.enum.js";
import * as cartService from "../../../services/cart/cart.service.js";
import { authorization } from "../../../middlewares/auth/auth.middleware.js";

const router = Router();

router.get(
    '/', 
    authorization, 
    async (req, res, next) => {
        try {
            const { token } = req;
            const foundCarts = await cartService.findAllCarts(token);

            res.send(foundCarts);
        } catch (err) {
            next(err);
        }
    }
);

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const foundCart = await cartService.findCart(id);

        res.send(foundCart);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { body } = req;
        const createdCart = await cartService.createCart(body);
        
        res.status(HttpCode.CREATED).send(createdCart);
    } catch (err) {
        next(err);
    }
});

router.patch('/:id', async (req, res, next) => {
    try {
        const { params, body } = req;
        const updatedCart = await cartService.updateCart(params.id, body);

        res.send(updatedCart);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { params, body } = req;
        const updatedCart = await cartService.updateCart(params.id, body);

        res.send(updatedCart);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await cartService.deleteCart(id);

        res.status(HttpCode.NO_CONTENT).send();
    } catch (err) {
        next(err);
    }
});

export {
    router as cartRoutes
}