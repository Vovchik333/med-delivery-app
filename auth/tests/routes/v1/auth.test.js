import request from "supertest";
import { app } from "../../../src/app";
import mongoose from "mongoose";
import { MONGO_URL } from "../../../src/config/config";
import { userRepository } from "../../../src/database/repositories/repositories";
import { 
    ADMIN_USER, 
    EMAIL_ALREADY_EXISTS_MESSAGE, 
    NOT_FOUND_MESSAGE,
    REGULAR_USER
} from "../../data/constants";
import * as authService from "../../../src/services/auth/auth.service";
import { compareSync } from "bcrypt";

const saltRounds = 10; 

describe("/api/v1/users", () => {
    beforeAll(async () => {
        await mongoose.connect(MONGO_URL);
    });
    afterAll(async () => {
        await mongoose.connection.close();
    });

    afterEach(async () => {
        await userRepository.deleteAll();
    });

    describe("POST /api/v1/auth/sign-up", () => {
        it("should return the registered user with token", async () => {
            const res = await request(app.getInstance())
                .post(`/api/v1/auth/sign-up`)
                .send(ADMIN_USER);
            
            expect(res.statusCode).toBe(200);
            expect(res.body.user.name).toBe(ADMIN_USER.name);
            expect(res.body.user.address).toBe(ADMIN_USER.address);
            expect(res.body.user.email).toBe(ADMIN_USER.email);
            expect(res.body.user.phone).toBe(ADMIN_USER.phone);
            expect(res.body.user.type).toBe(ADMIN_USER.type);
            expect(res.body.accessToken).toBeDefined();
        });

        it("should return message about email already exists", async () => {
            await authService.signUp(REGULAR_USER);

            const res = await request(app.getInstance())
                .post(`/api/v1/auth/sign-up`)
                .send(REGULAR_USER);
            
            expect(res.statusCode).toBe(400);
            expect(res.body).toEqual(EMAIL_ALREADY_EXISTS_MESSAGE);
        });
    });

    describe("POST /api/v1/auth/sign-in", () => {
        it("should return the user with token", async () => {
            const { email, password } = ADMIN_USER;
            await authService.signUp(ADMIN_USER);

            const res = await request(app.getInstance())
                .post(`/api/v1/auth/sign-in`)
                .send({ email, password });
            
            expect(res.statusCode).toBe(200);
            expect(res.body.user.name).toBe(ADMIN_USER.name);
            expect(compareSync(password, res.body.user.password)).toBe(true);
            expect(res.body.user.address).toBe(ADMIN_USER.address);
            expect(res.body.user.email).toBe(ADMIN_USER.email);
            expect(res.body.user.phone).toBe(ADMIN_USER.phone);
            expect(res.body.user.type).toBe(ADMIN_USER.type);
            expect(res.body.accessToken).toBeDefined();
        });

        it("should return message about user not found by email", async () => {
            const { email, password } = REGULAR_USER;

            const res = await request(app.getInstance())
                .post(`/api/v1/auth/sign-in`)
                .send({ email, password });
            
            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual(NOT_FOUND_MESSAGE);
        });
    });
});