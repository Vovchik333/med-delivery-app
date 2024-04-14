import "dotenv/config";
import { app } from "./app.js";
import { connectToDB } from "./database/connector.js";
import { userRepository } from "./database/repositories/repositories.js";

const startServer = async () => {
    await connectToDB();
    await userRepository.deleteAll();
    app.start();
}

startServer();