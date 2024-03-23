import { HttpCode } from "../../common/enums/http/http-code.enum.js";
import { userRepository } from "../../database/repositories/repositories.js";
import HttpError from "../../helpers/error/http.error.js";
import { jwtManager } from "../../helpers/jwt/jwt-manager.js";

const findUser = async (id, token) => {
    if (id !== token.id) {
        throw new HttpError({
            status: HttpCode.UNAUTHORIZED, 
            message: 'User id mismatch'
        });
    }

    const foundUser = await userRepository.getById(id);

    if (!foundUser) {
        throw new HttpError({
            status: HttpCode.NOT_FOUND,
            message: 'not found.'
        });
    }

    return foundUser;
}

const createUser = async (payload) => {
    const createdUser = await userRepository.create(payload);
    
    return {
        user: createdUser,
        accessToken: jwtManager.signJwt({ id: createdUser._id, type: createdUser.type })
    };
}

const updateUser = async (id, payload, token) => {
    if (id !== token.id) {
        throw new HttpError({
            status: HttpCode.UNAUTHORIZED, 
            message: 'User id mismatch'
        });
    }

    const updatedUser = await userRepository.updateById(id, payload);

    if (!updatedUser) {
        throw new HttpError({
            status: HttpCode.NOT_FOUND,
            message: 'not found.'
        });
    }

    return updatedUser;
}

const deleteUser = async (id, token) => {
    if (id !== token.id) {
        throw new HttpError({
            status: HttpCode.UNAUTHORIZED, 
            message: 'User id mismatch'
        });
    }

    const deletedUser = await userRepository.deleteById(id);

    if (!deletedUser.deletedCount) {
        throw new HttpError({
            status: HttpCode.NOT_FOUND,
            message: 'not found.'
        });
    }
}

export {
    findUser,
    createUser,
    updateUser,
    deleteUser
}