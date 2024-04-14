import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/config.js";
import { HttpCode } from "../../common/enums/http/http-code.enum.js";
import HttpError from "../error/http.error.js";

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

class JwtManager {
    #secret;

    constructor(secret) {
        this.#secret = secret;
    }

    signJwt(payload) {
        return jwt.sign(payload, this.#secret);
    }

    verifyJwt(token) {
        try {
            return jwt.verify(token, this.#secret);
        } catch (err) {
            throw new HttpError({ 
                status: HttpCode.UNAUTHORIZED, 
                message: 'Not Authorized' 
            });
        }
    }
}

const jwtManager = new JwtManager(JWT_SECRET);

export { jwtManager };