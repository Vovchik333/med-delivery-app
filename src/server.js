import "dotenv/config";
import { app } from "./app.js";
import { connectToDB } from "./database/connector.js";
import { createShops } from "./database/seeds/add-shops.js";

const startServer = async () => {
    await connectToDB();
    await createShops();
    app.start();
}

startServer();