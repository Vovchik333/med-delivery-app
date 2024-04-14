import { HttpCode } from "../../common/enums/http/http-code.enum.js";
import { userRepository } from "../../database/repositories/repositories.js";
import HttpError from "../../helpers/error/http.error.js";
import { jwtManager } from "../../helpers/jwt/jwt-manager.js";
import { compareSync, hash } from "bcrypt";

const saltRounds = 10; 

const signUp = async (payload) => {
    const isUserExists = Boolean(await userRepository.getByEmail(payload.email));

    if (isUserExists) {
        throw new HttpError({
            status: HttpCode.BAD_REQUEST,
            message: 'A user with this email already exists'
        });
    }

    payload.password = await hash(payload.password, saltRounds);
    const user = await userRepository.create(payload);

    return {
        user,
        accessToken: jwtManager.signJwt({ id: user._id, type: user.type })
    };
};

const signIn = async (payload) => {
    const user = await userRepository.getByEmail(payload.email);

    if (!user) {
        throw new HttpError({
            status: HttpCode.NOT_FOUND,
            message: 'not found.'
        });
    }

    const isMatch = compareSync(payload.password, user.password);

    if(!isMatch) {
        throw new HttpError({
            status: HttpCode.BAD_REQUEST,
            message: 'Password is not correct'
        });
    }

    return {
        user,
        accessToken: jwtManager.signJwt({ id: user._id, type: user.type })
    };
};

export {
    signUp,
    signIn
}