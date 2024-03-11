import { Router } from "express";
import { userRepository } from "../../../database/repositories/repositories.js";

const router = Router();

router.get('/', async (req, res) => {
    const foundUsers = await orderRepository.getAll();
    
    res.send(foundUsers);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const foundUser = await userRepository.getById(id);
    
    res.send(foundUser);
});

router.post('/', async (req, res) => {
    const createdUser = await userRepository.create(req.body);
    
    res.send(createdUser);
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedUser = await userRepository.updateById(id, req.body);
    
    res.send(updatedUser);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedUser = await userRepository.updateById(id, req.body);
    
    res.send(updatedUser);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deletedUser = await userRepository.deleteById(id);
    
    res.send(deletedUser);
});

export {
    router as userRoutes
}