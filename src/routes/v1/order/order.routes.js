import { Router } from "express";
import { HttpCode } from "../../../common/enums/http/http-code.enum.js";
import * as orderService from "../../../services/order/order.service.js";

const router = Router();

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const foundOrder = await orderService.findOrder(id);

        res.send(foundOrder);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { body } = req;
        const createdOrder = await orderService.createOrder(body);
        
        res.status(HttpCode.CREATED).send(createdOrder);
    } catch (err) {
        next(err);
    }
});

router.patch('/:id', async (req, res, next) => {
    try {
        const { params, body } = req;
        const updatedOrder = await orderService.updateOrder(params.id, body);
        
        res.send(updatedOrder);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { params, body } = req;
        const updatedOrder = await orderService.updateOrder(params.id, body);
        
        res.send(updatedOrder);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await orderService.deleteOrder(id);
        
        res.status(HttpCode.NO_CONTENT).send();
    } catch (err) {
        next(err);
    }
});

export {
    router as orderRoutes
}