import { Router } from "express";
import { authorization } from "../../../middlewares/auth/auth.middleware.js";
import * as userService from "../../../services/user/user.service.js";
import { HttpCode } from "../../../common/enums/http/http-code.enum.js";

const router = Router();

router.get(
    '/',
    authorization, 
    async (req, res, next) => {
        try {
            const { token } = req;
            const foundUsers = await userService.findAllUsers(token);
            
            res.send(foundUsers);
        } catch (err) {
            next(err);
        }
    }
);

router.get(
    '/:id', 
    authorization,
    async (req, res, next) => {
        try {
            const { params, token } = req;
            const foundUser = await userService.findUser(params.id, token);
            
            res.send(foundUser);
        } catch (err) {
            next(err);
        }
    }
);

router.post('/', async (req, res, next) => {
    try {
        const { body } = req;
        const createdUser = await userService.createUser(body);

        res.status(HttpCode.CREATED).send(createdUser);
    } catch (err) {
        next(err);
    }
});

router.patch(
    '/:id', 
    authorization, 
    async (req, res, next) => {
        try {
            const { params, body, token } = req;
            const updatedUser = await userService.updateUser(params.id, body, token);
            
            res.send(updatedUser);
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
            const updatedUser = await userService.updateUser(params.id, body, token);
            
            res.send(updatedUser);
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
            await userService.deleteUser(params.id, token);
            
            res.status(HttpCode.NO_CONTENT).send();
        } catch (err) {
            next(err);
        }
    }
);

export {
    router as userRoutes
}