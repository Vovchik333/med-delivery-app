import request from "supertest";
import { app } from "../../../src/app";
import mongoose from "mongoose";
import { MONGO_URL } from "../../../src/config";
import { 
    medicineRepository, 
    shopRepository, 
    userRepository 
} from "../../../src/database/repositories/repositories";
import { 
    ADMIN_USER, 
    MEDICINE_DATA, 
    NOT_ACCESS_RESOURCE_MESSAGE, 
    NOT_AUTHORIZED_MESSAGE, 
    NOT_FOUND_MESSAGE, 
    REGULAR_USER, 
    SHOP_DATA 
} from "../../data/constants/constants";
import * as medicineService from "../../../src/services/medicine/medicine.service";
import * as shopService from "../../../src/services/shop/shop.service";
import * as userService from "../../../src/services/user/user.service";
import { jwtManager } from "../../../src/helpers/jwt/jwt-manager";

describe("/api/v1/shops", () => {
    let adminToken;
    let regularToken;
    let testMedicine;

    beforeAll(async () => {
        await mongoose.connect(MONGO_URL);

        const { accessToken: adminAccessToken } = await userService.createUser(ADMIN_USER);
        const { accessToken: regularAccessToken } = await userService.createUser(REGULAR_USER);

        adminToken = adminAccessToken;
        regularToken = regularAccessToken;
        testMedicine = await medicineService.createMedicine(MEDICINE_DATA, jwtManager.verifyJwt(adminToken));

        SHOP_DATA.medicines = [testMedicine._id];
    });
    afterAll(async () => {
        await medicineRepository.deleteAll();
        await userRepository.deleteAll();
        await mongoose.connection.close();
    });

    afterEach(async () => {
        await shopRepository.deleteAll();
    });

    describe("GET /api/v1/shops/:id", () => {
        it("should return a shop", async () => {
            const { _id: id } = await shopService.createShop(SHOP_DATA, jwtManager.verifyJwt(adminToken));

            const res = await request(app.getInstance())
                .get(`/api/v1/shops/${id}`);
            
            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe(SHOP_DATA.name);
            expect(res.body.medicines.length).toBeGreaterThanOrEqual(1);
            expect(res.body.medicines[0].name).toBe("Lipitor");
            expect(res.body.medicines[0].isFavorite).toBe(true);
            expect(res.body.medicines[0].price).toBeCloseTo(9.5);
        });

        it("should be returned message that the object was not found", async () => {
            const res = await request(app.getInstance())
                .get(`/api/v1/shops/00004d6a0000b9219d880000`);
            
            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual(NOT_FOUND_MESSAGE);
        });
    });

    describe("POST /api/v1/shops", () => {
        it("should return created shop", async () => {
            const res = await request(app.getInstance())
                .post("/api/v1/shops")
                .send(SHOP_DATA)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(res.statusCode).toBe(201);
            expect(res.body.name).toBe(SHOP_DATA.name);
            expect(res.body.medicines.length).toBeGreaterThanOrEqual(1);
        });

        it("should return message that user does not have access to the resource", async () => {
            const res = await request(app.getInstance())
                .post("/api/v1/shops")
                .send(SHOP_DATA)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${regularToken}`);

            expect(res.statusCode).toBe(403);
            expect(res.body).toEqual(NOT_ACCESS_RESOURCE_MESSAGE);
        });
    });

    describe("PATCH /api/v1/shops/:id", () => {
        it("should update a shop", async () => {
            const { _id: id } = await shopService.createShop(SHOP_DATA, jwtManager.verifyJwt(adminToken));

            const res = await request(app.getInstance())
                .patch(`/api/v1/shops/${id}`)
                .send({ ...SHOP_DATA, name: 'VitalMed' })
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${adminToken}`);
            
            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe("VitalMed");
            expect(res.body.medicines.length).toBeGreaterThanOrEqual(1);
        });

        it("should be returned message that the object was not found", async () => {
            const res = await request(app.getInstance())
                .patch(`/api/v1/shops/00004d6a0000b9219d880000`)
                .send({ ...SHOP_DATA, name: 'VitalMed' })
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${adminToken}`);
            
            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual(NOT_FOUND_MESSAGE);
        });

        it("should return a message that the user is not authorized", async () => {
            const { _id: id } = await shopService.createShop(SHOP_DATA, jwtManager.verifyJwt(adminToken));

            const res = await request(app.getInstance())
                .patch(`/api/v1/shops/${id}`)
                .send({ ...SHOP_DATA, name: 'VitalMed' });
            
            expect(res.statusCode).toBe(401);
            expect(res.body).toEqual(NOT_AUTHORIZED_MESSAGE);
        });
    });

    describe("DELETE /api/v1/shops/:id", () => {
        it("should delete a shop", async () => {
            const { _id: id } = await shopService.createShop(SHOP_DATA, jwtManager.verifyJwt(adminToken));

            const res = await request(app.getInstance())
                .delete(`/api/v1/shops/${id}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(res.statusCode).toBe(204);
            expect(res.body).toStrictEqual({});
        });

        it("should be returned message that the object was not found", async () => {
            const res = await request(app.getInstance())
                .delete(`/api/v1/shops/00004d6a0000b9219d880000`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual(NOT_FOUND_MESSAGE);
        });

        it("should return a message that the user is not authorized", async () => {
            const { _id: id } = await shopService.createShop(SHOP_DATA, jwtManager.verifyJwt(adminToken));

            const res = await request(app.getInstance())
                .delete(`/api/v1/shops/${id}`);
            
            expect(res.statusCode).toBe(401);
            expect(res.body).toEqual(NOT_AUTHORIZED_MESSAGE);
        });
    });
});