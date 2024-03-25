import { Router } from "express";
import { medicineRepository } from "../../../database/repositories/repositories.js";

const router = Router();

router.get('/', async (req, res) => {
    const medicines = await medicineRepository.getAll();
    
    res.send(medicines);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const foundMedicine = await medicineRepository.getById(id);

    if (!foundMedicine) {
        return res.status(404).send({ message: 'not found.'});
    }
    
    res.send(foundMedicine);
});

router.post('/', async (req, res) => {
    const createdMedicine = await medicineRepository.create(req.body);
    
    res.send(createdMedicine);
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedMedicine = await medicineRepository.updateById(id, req.body);

    if (!updatedMedicine) {
        return res.status(404).send({ message: 'not found.'});
    }
    
    res.send(updatedMedicine);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedMedicine = await medicineRepository.updateById(id, req.body);

    if (!updatedMedicine) {
        return res.status(404).send({ message: 'not found.'});
    }
    
    res.send(updatedMedicine);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deletedMedicine = await medicineRepository.deleteById(id);

    if (!deletedMedicine.deletedCount) {
        return res.status(404).send({ message: 'not found.'});
    }
    
    res.status(204).send();
});

export {
    router as medicineRoutes
}