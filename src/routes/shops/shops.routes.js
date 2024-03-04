import { Router } from "express";
import path from 'node:path';
import { HTML_STATIC_PATH } from "../../config.js";
import { shopRepository } from "../../database/repositories/repositories.js";

const router = Router();

router.get('/', async (req, res) => {
    const page = path.join(HTML_STATIC_PATH, 'shops.html');
    res.sendFile(page);
});

router.get('/all', async (req, res) => {
    const shops = await shopRepository.getAllWithMedicines();
    
    res.send(shops);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const shop = await shopRepository.getOneWithMedicines(id);
    
    res.send(shop);
});

export {
    router as shopsRoutes
}
