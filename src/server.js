import "dotenv/config";
import express from "express";
import { routes } from "./routes/routes.js";
import { views } from "./views/views.js";
import { PORT, STATIC_PATH } from "./config.js";
import "./database/connector.js";
import { errorResponder } from "./middlewares/error/error-responder.middleware.js";

const app = express();

app.use(express.static(STATIC_PATH));
app.use(express.json());
app.use(views);
app.use('/api', routes);
app.use(errorResponder);

app.listen(PORT, () => {
    console.log(`server listen on port http://localhost:${PORT}`)
});