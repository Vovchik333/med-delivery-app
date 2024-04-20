import { logger } from "../../helpers/logging/logger.js";

const logAcceptedRequest = (req, res, next) => {
    logger.info(`Received a ${req.method} request for ${req.url}`);
    next();
}

export {
    logAcceptedRequest
}
