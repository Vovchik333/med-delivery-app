import { Router } from "express";
import { medicineRepository } from "../../database/repositories/repositories.js";

const router = Router();

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const shop = await medicineRepository.updateById(id, req.body);
    
    res.send(shop);
});

export {
    router as medicineRoutes
}