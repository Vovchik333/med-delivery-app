import { Router } from "express";
import { shopRepository } from "../../../database/repositories/repositories.js";

const router = Router();

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const foundShop = await shopRepository.getOneWithMedicines(id);

    if (!foundShop) {
        return res.status(404).send({ message: 'not found.'});
    }

    res.send(foundShop);
});

router.post('/', async (req, res) => {
    const createdShop = await shopRepository.create(req.body);
    
    res.send(createdShop);
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedShop = await shopRepository.updateById(id, req.body);

    if (!updatedShop) {
        return res.status(404).send({ message: 'not found.'});
    }
    
    res.send(updatedShop);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedShop = await shopRepository.updateById(id, req.body);

    if (!updatedShop) {
        return res.status(404).send({ message: 'not found.'});
    }
    
    res.send(updatedShop);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deletedShop = await shopRepository.deleteById(id);

    if (!deletedShop.deletedCount) {
        return res.status(404).send({ message: 'not found.'});
    }
    
    res.status(204).send();
});

export {
    router as shopsRoutes
}