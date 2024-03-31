import request from "supertest";
import { app } from "../../../src/app";
import mongoose from "mongoose";
import { MONGO_URL } from "../../../src/config";
import { userRepository } from "../../../src/database/repositories/repositories";
import { UserType } from "../../../src/common/enums/user/user-type.enum";
import { 
    ADMIN_USER, 
    NOT_AUTHORIZED_MESSAGE, 
    NOT_FOUND_MESSAGE, 
} from "../../data/constants/constants";
import * as userService from "../../../src/services/user/user.service";

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

    describe("GET /api/v1/users/:id", () => {
        it("should return a user", async () => {
            const { user: { _id: id }, accessToken: token } = await userService.createUser(ADMIN_USER);

            const res = await request(app.getInstance())
                .get(`/api/v1/users/${id}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            
            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe(ADMIN_USER.name);
            expect(res.body.address).toBe(ADMIN_USER.address);
            expect(res.body.email).toBe(ADMIN_USER.email);
            expect(res.body.phone).toBe(ADMIN_USER.phone);
            expect(res.body.type).toBe(ADMIN_USER.type);
        });

        it("should be returned message that the object was not found", async () => {
            const { user: { _id: id }, accessToken: token  } = await userService.createUser(ADMIN_USER);

            await userRepository.deleteById(id);
            const res = await request(app.getInstance())
                .get(`/api/v1/users/${id}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            
            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual(NOT_FOUND_MESSAGE);
        });

        it("should return a message that the user is not authorized", async () => {
            const { _id: id } = await userService.createUser(ADMIN_USER);

            const res = await request(app.getInstance())
                .get(`/api/v1/users/${id}`);
            
            expect(res.statusCode).toBe(401);
            expect(res.body).toEqual(NOT_AUTHORIZED_MESSAGE);
        });
    });

    describe("POST /api/v1/users", () => {
        it("should return created user", async () => {
            const res = await request(app.getInstance())
                .post("/api/v1/users")
                .send(ADMIN_USER);

            expect(res.statusCode).toBe(201);
            expect(res.body.user.name).toBe(ADMIN_USER.name);
            expect(res.body.user.address).toBe(ADMIN_USER.address);
            expect(res.body.user.email).toBe(ADMIN_USER.email);
            expect(res.body.user.phone).toBe(ADMIN_USER.phone);
            expect(res.body.user.type).toBe(ADMIN_USER.type);
        });
    });

    describe("PUT /api/v1/users/:id", () => {
        const dataForUpdate = {
            name: "Dima",
            email: "dima234@gmail.com",
            phone: "380978927431",
            address: "Naukova Street 39",
            type: UserType.REGULAR
        };

        it("should update a user", async () => {
            const { user: { _id: id }, accessToken: token  } = await userService.createUser(ADMIN_USER);

            const res = await request(app.getInstance())
                .put(`/api/v1/users/${id}`)
                .send(dataForUpdate)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            
            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe(dataForUpdate.name);
            expect(res.body.address).toBe(dataForUpdate.address);
            expect(res.body.email).toBe(dataForUpdate.email);
            expect(res.body.phone).toBe(dataForUpdate.phone);
            expect(res.body.type).toBe(dataForUpdate.type);
        });

        it("should be returned message that the object was not found", async () => {
            const { user: { _id: id }, accessToken: token  } = await userService.createUser(ADMIN_USER);

            await userRepository.deleteById(id);
            const res = await request(app.getInstance())
                .put(`/api/v1/users/${id}`)
                .send(dataForUpdate)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            
            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual(NOT_FOUND_MESSAGE);
        });

        it("should return a message that the user is not authorized", async () => {
            const { _id: id } = await userService.createUser(ADMIN_USER);

            const res = await request(app.getInstance())
                .put(`/api/v1/users/${id}`)
                .send(dataForUpdate);
            
            expect(res.statusCode).toBe(401);
            expect(res.body).toEqual(NOT_AUTHORIZED_MESSAGE);
        });
    });

    describe("DELETE /api/v1/users/:id", () => {
        it("should delete a user", async () => {
            const { user: { _id: id }, accessToken: token } = await userService.createUser(ADMIN_USER);

            const res = await request(app.getInstance())
                .delete(`/api/v1/users/${id}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(204);
            expect(res.body).toStrictEqual({});
        });

        it("should be returned message that the object was not found", async () => {
            const { user: { _id: id }, accessToken: token  } = await userService.createUser(ADMIN_USER);

            await userRepository.deleteById(id);
            const res = await request(app.getInstance())
                .delete(`/api/v1/users/${id}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            
            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual(NOT_FOUND_MESSAGE);
        });

        it("should return a message that the user is not authorized", async () => {
            const { _id: id } = await userService.createUser(ADMIN_USER);

            const res = await request(app.getInstance())
                .delete(`/api/v1/users/${id}`);
            
            expect(res.statusCode).toBe(401);
            expect(res.body).toEqual(NOT_AUTHORIZED_MESSAGE);
        });
    });
});