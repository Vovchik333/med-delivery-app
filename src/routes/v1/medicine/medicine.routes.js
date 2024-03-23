import { Router } from "express";
import { HttpCode } from "../../../common/enums/http/http-code.enum.js";
import * as medicineService from "../../../services/medicine/medicine.service.js";
import { authorization } from "../../../middlewares/auth/auth.middleware.js";

const router = Router();

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const foundMedicine = await medicineService.findMedicine(id);
        
        res.send(foundMedicine);
    } catch (err) {
        next(err);
    }
});

router.post(
    '/', 
    authorization,
    async (req, res, next) => {
        try {
            const { body, token } = req;
            const createdMedicine = await medicineService.createMedicine(body, token);
            
            res.status(HttpCode.CREATED).send(createdMedicine);
        } catch (err) {
            next(err);
        }
    }
);

router.patch(
    '/:id', 
    authorization,
    async (req, res, next) => {
        try {
            const { params, body, token } = req;
            const updatedMedicine = await medicineService.updateMedicine(params.id, body, token);
            
            res.send(updatedMedicine);
        } catch (err) {
            next(err);
        }
    }
);

router.put(
    '/:id', 
    authorization,
    async (req, res, next) => {
        try {
            const { params, body, token } = req;
            const updatedMedicine = await medicineService.updateMedicine(params.id, body, token);
            
            res.send(updatedMedicine);
        } catch (err) {
            next(err);
        }
    }
);

router.delete(
    '/:id', 
    authorization,
    async (req, res, next) => {
        try {
            const { params, token } = req;
            await medicineService.deleteMedicine(params.id, token);
            
            res.status(HttpCode.NO_CONTENT).send();
        } catch (err) {
            next(err);
        }
    }
);

export {
    router as medicineRoutes
}