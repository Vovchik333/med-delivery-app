import { HttpCode } from "../../common/enums/http/http-code.enum.js";
import HttpError from "../../helpers/error/http.error.js";

const errorResponder = (err, req, res, next) => {
    // console.log(err);
    if (err instanceof HttpError) {
        const { status, message } = err;
        res.status(status).send({ error: message });
        return;
    }

    res.status(HttpCode.INTERNAL_SERVER_ERROR).send('Internal Server Error.');
}

export { errorResponder };