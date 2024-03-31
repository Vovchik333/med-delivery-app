import express from "express";
import cors from "cors";
import { createDocs } from "./docs/docs.js";
import { routes } from "./routes/routes.js";
import { views } from "./views/views.js";
import { PORT, STATIC_PATH } from "./config.js";
import { errorResponder } from "./middlewares/error/error-responder.middleware.js";

class App {
    #instance;

    constructor() {
        this.#instance = express();

        createDocs(this.#instance);

        this.#instance.use(cors());
        this.#instance.use(express.static(STATIC_PATH));
        this.#instance.use(express.json());
        this.#instance.use(views);
        this.#instance.use('/api', routes);
        this.#instance.use(errorResponder);
    }

    start() {
        this.#instance.listen(PORT, () => {
            console.log(`server listen on port http://localhost:${PORT}`)
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