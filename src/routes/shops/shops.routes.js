import { Router } from "express";
import { shopRepository } from "../../database/repositories/repositories.js";

const router = Router();

router.get('/', async (req, res) => {
    const shops = await shopRepository.getAllWithMedicines();
    
    res.send(shops);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const { 
        sortByPrice = false
    } = req.query;

    const shop = await shopRepository.getOneWithMedicines(id);
    
    if (sortByPrice) {
        shop.medicines = shop.medicines.sort((med, otherMed) => med.price - otherMed.price);
    }
    
    res.send(shop);
});

export {
    router as shopsRoutes
}
