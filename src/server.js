import "dotenv/config";
import express from "express";
import { routes } from "./routes/routes.js";
import { PORT, STATIC_PATH } from "./config.js";
import "./database/connector.js";

const app = express();

app.use(express.static(STATIC_PATH));
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
    console.log(`server listen on port http://localhost:${PORT}`)
});