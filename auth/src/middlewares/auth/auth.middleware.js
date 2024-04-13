import { HttpCode } from "../../common/enums/http/http-code.enum.js";
import HttpError from "../../helpers/error/http.error.js";
import { jwtManager } from "../../helpers/jwt/jwt-manager.js";

const authorization = (req, res, next) => {
    try {
        const token = req.headers[`authorization`];

        if(!token) {
            throw new HttpError({ 
                status: HttpCode.UNAUTHORIZED, 
                message: 'Not Authorized' 
            });
        }

        const decoded = jwtManager.verifyJwt(token.replace('Bearer ', ''));
        req.token = decoded;

        next();
    } catch(err) {
        next(err);
    }
}

export { authorization };