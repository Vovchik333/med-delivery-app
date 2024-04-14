import { HttpCode } from "../../common/enums/http/http-code.enum.js";
import { UserType } from "../../common/enums/user/user-type.enum.js";
import { userRepository } from "../../database/repositories/repositories.js";
import HttpError from "../../helpers/error/http.error.js";

const findAllUsers = async (token) => {
    if (token.type !== UserType.ADMIN) {
        throw new HttpError({
            status: HttpCode.UNAUTHORIZED, 
            message: 'Reqular user does not have access to the resource'
        });
    }

    return await userRepository.getAll();
}

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
    findAllUsers,
    findUser,
    updateUser,
    deleteUser
}