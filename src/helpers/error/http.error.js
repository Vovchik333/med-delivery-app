import { HttpCode } from "../../common/enums/http/http-code.enum.js";

/**
 * @swagger
 * components:
 *   responses:
 *     UnauthorizedError:
 *       description: Returns message about unauthorized error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: String
 *                 description: message about unauthorized error
 *                 example: "Not Authorized"
 *     NotFoundError:
 *       description: Returns message about object not found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: String
 *                 description: message about error
 *                 example: "not found."
 */

const DEFAULT_MESSAGE = 'Internal Server Error.';

class HttpError extends Error {
    #status;

    constructor({ 
        status = HttpCode.INTERNAL_SERVER_ERROR, 
        message = DEFAULT_MESSAGE
    }) {
        super(message);
        this.#status = status;
    }

    get status() {
        return this.#status;
    }
}

export default HttpError;