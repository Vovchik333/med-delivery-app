import express from "express";
import cors from "cors";
import { createDocs } from "./docs/docs.js";
import { routes } from "./routes/routes.js";
import { PORT } from "./config/config.js";
import { errorResponder } from "./middlewares/error/error-responder.middleware.js";
import { logAcceptedRequest } from "./middlewares/logging/logging.middleware.js";
import { logger } from "./helpers/logging/logger.js";

class App {
    #instance;

    constructor() {
        this.#instance = express();

        createDocs(this.#instance);

        this.#instance.use(cors());
        this.#instance.use(express.json());
        this.#instance.use(logAcceptedRequest);
        this.#instance.use('/api', routes);
        this.#instance.use(errorResponder);
    }

    start() {
        this.#instance.listen(PORT, () => {
            logger.info(`server listen on port http://localhost:${PORT}`);
        });
    }

    getInstance() {
        return this.#instance;
    }
}

const app = new App();

export {
    app
};