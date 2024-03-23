import { HttpCode } from "../../common/enums/http/http-code.enum.js";

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