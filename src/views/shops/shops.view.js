import { Router } from "express";
import path from 'node:path';
import { HTML_STATIC_PATH } from "../../config.js";

const router = Router();

router.get('/', async (req, res) => {
    const page = path.join(HTML_STATIC_PATH, 'shops.html');
    res.sendFile(page);
});

export {
    router as shopsView
}