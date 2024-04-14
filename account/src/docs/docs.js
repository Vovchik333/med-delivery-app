import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { optionsV1 } from "./options/v1/options-v1.js";
import { optionsV2 } from "./options/v2/options-v2.js";

const createDocs = (app) => {
    const specV1 = swaggerJsDoc(optionsV1);
    const specV2 = swaggerJsDoc(optionsV2);

    const swaggerHtmlV1 = swaggerUI.generateHTML(specV1, optionsV1);
    const swaggerHtmlV2 = swaggerUI.generateHTML(specV2, optionsV2);

    app.use('/api/v1/docs', swaggerUI.serveFiles(specV1, optionsV1));
    app.get('/api/v1/docs', (req, res) => { res.send(swaggerHtmlV1) });

    app.use('/api/v2/docs', swaggerUI.serveFiles(specV2, optionsV2));
    app.get('/api/v2/docs', (req, res) => { res.send(swaggerHtmlV2) });
}

export { createDocs }