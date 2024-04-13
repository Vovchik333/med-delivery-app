import { userModel } from "../models/user/user.model.js";
import { UserRepository } from "./user/user.repository.js";

const userRepository = new UserRepository(userModel);

export {
    userRepository
}