import { Router } from "express";
import { orderRepository } from "../../../database/repositories/repositories.js";

const router = Router();

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const foundOrder = await orderRepository.getByIdWithUserAndCart(id);

    if (!foundOrder) {
        return res.status(404).send({ message: 'not found.'});
    }
    
    res.send(foundOrder);
});

router.post('/', async (req, res) => {
    const orderPayload = req.body;
    orderPayload.finalSum = orderPayload.shoppingCart.totalSum;

    const createdOrder = await orderRepository.create(orderPayload);
    
    res.send(createdOrder);
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedOrder = await orderRepository.updateById(id, req.body);

    if (!updatedOrder) {
        return res.status(404).send({ message: 'not found.'});
    }
    
    res.send(updatedOrder);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedOrder = await orderRepository.updateById(id, req.body);

    if (!updatedOrder) {
        return res.status(404).send({ message: 'not found.'});
    }
    
    res.send(updatedOrder);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deletedOrder = await orderRepository.deleteById(id);

    if (!deletedOrder.deletedCount) {
        return res.status(404).send({ message: 'not found.'});
    }
    
    res.status(204).send();
});

export {
    router as orderRoutes
}