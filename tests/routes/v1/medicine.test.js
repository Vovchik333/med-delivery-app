import request from "supertest";
import { app } from "../../../src/app";
import mongoose from "mongoose";
import { MONGO_URL } from "../../../src/config";
import { 
    medicineRepository, 
    userRepository 
} from "../../../src/database/repositories/repositories";
import { 
    ADMIN_USER, 
    MEDICINE_DATA, 
    NOT_ACCESS_RESOURCE_MESSAGE, 
    NOT_AUTHORIZED_MESSAGE, 
    NOT_FOUND_MESSAGE, 
    REGULAR_USER 
} from "../../data/constants/constants";
import * as medicineService from "../../../src/services/medicine/medicine.service";
import * as userService from "../../../src/services/user/user.service";
import { jwtManager } from "../../../src/helpers/jwt/jwt-manager";

describe("/api/v1/medicines", () => {
    let adminToken;
    let regularToken;

    beforeAll(async () => {
        await mongoose.connect(MONGO_URL);

        const { accessToken: adminAccessToken } = await userService.createUser(ADMIN_USER);
        const { accessToken: regularAccessToken } = await userService.createUser(REGULAR_USER);

        adminToken = adminAccessToken;
        regularToken = regularAccessToken;
    });
    afterAll(async () => {
        await userRepository.deleteAll();
        await mongoose.connection.close();
    });

    afterEach(async () => {
        await medicineRepository.deleteAll();
    });

    describe("GET /api/v1/medicines/:id", () => {
        it("should return a medicine", async () => {
            const { _id: id } = await medicineService.createMedicine(MEDICINE_DATA, jwtManager.verifyJwt(adminToken));
            const res = await request(app.getInstance())
                .get(`/api/v1/medicines/${id}`);
            
            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe(MEDICINE_DATA.name);
            expect(res.body).toHaveProperty('name');
            expect(res.body).toHaveProperty('price');
            expect(res.body).toHaveProperty('isFavorite');
        });

        it("should be returned message that the object was not found", async () => {
            const res = await request(app.getInstance())
                .get(`/api/v1/medicines/00004d6a0000b9219d880000`);
            
            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual(NOT_FOUND_MESSAGE);
        });
    });

    describe("POST /api/v1/medicines", () => {
        it("should return created medicine", async () => {
            const res = await request(app.getInstance())
                .post("/api/v1/medicines")
                .send(MEDICINE_DATA)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(res.statusCode).toBe(201);
            expect(res.body.name).toBe(MEDICINE_DATA.name);
            expect(res.body).toHaveProperty('name');
            expect(res.body).toHaveProperty('price');
            expect(res.body).toHaveProperty('isFavorite');
        });

        it("should return message that user does not have access to the resource", async () => {
            const res = await request(app.getInstance())
                .post("/api/v1/medicines")
                .send(MEDICINE_DATA)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${regularToken}`);

            expect(res.statusCode).toBe(403);
            expect(res.body).toEqual(NOT_ACCESS_RESOURCE_MESSAGE);
        });
    });

    describe("PATCH /api/v1/medicines/:id", () => {
        it("should update a medicine", async () => {
            const { _id: id } = await medicineService.createMedicine(MEDICINE_DATA, jwtManager.verifyJwt(adminToken));

            const res = await request(app.getInstance())
                .patch(`/api/v1/medicines/${id}`)
                .send({ ...MEDICINE_DATA, name: 'Advil' })
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${adminToken}`);
            
            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe("Advil");
        });

        it("should be returned message that the object was not found", async () => {
            const res = await request(app.getInstance())
                .patch(`/api/v1/medicines/00004d6a0000b9219d880000`)
                .send({ ...MEDICINE_DATA, name: 'Advil' })
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${adminToken}`);
            
            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual(NOT_FOUND_MESSAGE);
        });

        it("should return a message that the user is not authorized", async () => {
            const { _id: id } = await medicineService.createMedicine(MEDICINE_DATA, jwtManager.verifyJwt(adminToken));

            const res = await request(app.getInstance())
                .patch(`/api/v1/medicines/${id}`)
                .send({ ...MEDICINE_DATA, name: 'Advil' });
            
            expect(res.statusCode).toBe(401);
            expect(res.body).toEqual(NOT_AUTHORIZED_MESSAGE);
        });
    });

    describe("DELETE /api/v1/medicines/:id", () => {
        it("should delete a medicine", async () => {
            const { _id: id } = await medicineService.createMedicine(MEDICINE_DATA, jwtManager.verifyJwt(adminToken));

            const res = await request(app.getInstance())
                .delete(`/api/v1/medicines/${id}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(res.statusCode).toBe(204);
            expect(res.body).toStrictEqual({});
        });

        it("should be returned message that the object was not found", async () => {
            const res = await request(app.getInstance())
                .delete(`/api/v1/medicines/00004d6a0000b9219d880000`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${adminToken}`);
            
            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual(NOT_FOUND_MESSAGE);
        });

        it("should return a message that the user is not authorized", async () => {
            const { _id: id } = await medicineService.createMedicine(MEDICINE_DATA, jwtManager.verifyJwt(adminToken));

            const res = await request(app.getInstance())
                .delete(`/api/v1/medicines/${id}`);
            
            expect(res.statusCode).toBe(401);
            expect(res.body).toEqual(NOT_AUTHORIZED_MESSAGE);
        });
    });
});