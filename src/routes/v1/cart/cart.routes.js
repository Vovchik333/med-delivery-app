import { Router } from "express";
import { cartRepository } from "../../../database/repositories/repositories.js";

const router = Router();

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const foundCart = await cartRepository.getByIdWithItems(id);

    if (!foundCart) {
        return res.status(404).send({ message: 'not found.'});
    }

    res.send(foundCart);
});

router.post('/', async (req, res) => {
    const cartPayload = req.body;
    cartPayload.totalSum = cartPayload.items.reduce((acc, cur) => acc + (cur.item.price * cur.quantity), 0);
    cartPayload.items = cartPayload.items.map(elem => ({ item: elem.item._id, quantity: elem.quantity }));

    const createdCart = await cartRepository.create(cartPayload);

    res.send(createdCart);
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedCart = await cartRepository.updateById(id, req.body);

    if (!updatedCart) {
        return res.status(404).send({ message: 'not found.'});
    }

    res.send(updatedCart);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedCart = await cartRepository.updateById(id, req.body);

    if (!updatedCart) {
        return res.status(404).send({ message: 'not found.'});
    }

    res.send(updatedCart);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deletedCart = await cartRepository.deleteById(id);

    if (!deletedCart.deletedCount) {
        return res.status(404).send({ message: 'not found.'});
    }

    res.status(204).send();
});

export {
    router as cartRoutes
}