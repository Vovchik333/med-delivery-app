import "dotenv/config";
import express from "express";
import { routes } from "./routes/routes.js";
import { views } from "./views/views.js";
import { PORT, STATIC_PATH } from "./config.js";
import cors from "cors";
import "./database/connector.js";
import { errorResponder } from "./middlewares/error/error-responder.middleware.js";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { optionsV1 } from "./docs/v1/options-v1.js";
import { optionsV2 } from "./docs/v2/options-v2.js";

const specV1 = swaggerJsDoc(optionsV1);
const specV2 = swaggerJsDoc(optionsV2);

const app = express();

const swaggerHtmlV1 = swaggerUI.generateHTML(specV1, optionsV1)
const swaggerHtmlV2 = swaggerUI.generateHTML(specV2, optionsV2)

app.use('/api/v1/docs', swaggerUI.serveFiles(specV1, optionsV1))
app.get('/api/v1/docs', (req, res) => { res.send(swaggerHtmlV1) });

app.use('/api/v2/docs', swaggerUI.serveFiles(specV2, optionsV2))
app.get('/api/v2/docs', (req, res) => { res.send(swaggerHtmlV2) });

app.use(cors());
app.use(express.static(STATIC_PATH));
app.use(express.json());
app.use(views);
app.use('/api', routes);
app.use(errorResponder);

app.listen(PORT, () => {
    console.log(`server listen on port http://localhost:${PORT}`)
});