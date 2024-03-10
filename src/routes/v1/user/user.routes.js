import { Router } from "express";
import { userRepository } from "../../../database/repositories/repositories.js";

const router = Router();

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const foundUser = await userRepository.getById(id);

    if (!foundUser) {
        return res.status(404).send({ message: 'not found.'});
    }
    
    res.send(foundUser);
});

router.post('/', async (req, res) => {
    const createdUser = await userRepository.create(req.body);
    
    res.send(createdUser);
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedUser = await userRepository.updateById(id, req.body);

    if (!updatedUser) {
        return res.status(404).send({ message: 'not found.'});
    }
    
    res.send(updatedUser);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedUser = await userRepository.updateById(id, req.body);

    if (!updatedUser) {
        return res.status(404).send({ message: 'not found.'});
    }
    
    res.send(updatedUser);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deletedUser = await userRepository.deleteById(id);

    if (!deletedUser.deletedCount) {
        return res.status(404).send({ message: 'not found.'});
    }
    
    res.status(204).send();
});

export {
    router as userRoutes
}