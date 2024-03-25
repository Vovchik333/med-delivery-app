import { Router } from "express";
import { cartItemRepository, cartRepository } from "../../../database/repositories/repositories.js";

const router = Router();

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const foundCartItem = await cartItemRepository.getByIdWithItem(id);

    if (!foundCartItem) {
        return res.status(404).send({ message: 'not found.'});
    }
    
    res.send(foundCartItem);
});

router.post('/', async (req, res) => {
    const { cartId, cartItem } = req.body;
    const createdCartItem = await cartItemRepository.create(cartItem);
    const { _id, quantity } = createdCartItem

    cartRepository.addItem(cartId, { _id, quantity, item: cartItem.item });
    
    res.send(createdCartItem);
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedCartItem = await cartItemRepository.updateById(id, req.body);

    if (!updatedCartItem) {
        return res.status(404).send({ message: 'not found.'});
    }
    
    res.send(updatedCartItem);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedCartItem = await cartItemRepository.updateById(id, req.body);

    if (!updatedCartItem) {
        return res.status(404).send({ message: 'not found.'});
    }
    
    res.send(updatedCartItem);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deletedCartItem = await cartItemRepository.deleteById(id);

    if (!deletedCartItem.deletedCount) {
        return res.status(404).send({ message: 'not found.'});
    }
    
    res.status(204).send();
});

export {
    router as cartItemRoutes
}