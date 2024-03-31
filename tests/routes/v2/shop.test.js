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
    SECOND_MEDICINE_DATA, 
    SHOP_DATA 
} from "../../data/constants/constants";
import * as medicineService from "../../../src/services/medicine/medicine.service";
import * as shopService from "../../../src/services/shop/shop.service";
import * as userService from "../../../src/services/user/user.service";
import { jwtManager } from "../../../src/helpers/jwt/jwt-manager";

describe("/api/v2/shops", () => {
    let adminToken;
    let regularToken;

    beforeAll(async () => {
        await mongoose.connect(MONGO_URL);

        const { accessToken: adminAccessToken } = await userService.createUser(ADMIN_USER);
        const { accessToken: regularAccessToken } = await userService.createUser(REGULAR_USER);

        adminToken = adminAccessToken;
        regularToken = regularAccessToken;
        
        const secondTestMedicine = await medicineService.createMedicine(SECOND_MEDICINE_DATA, jwtManager.verifyJwt(adminToken));
        const firstTestMedicine = await medicineService.createMedicine(MEDICINE_DATA, jwtManager.verifyJwt(adminToken));

        SHOP_DATA.medicines = [
            secondTestMedicine._id,
            firstTestMedicine._id
        ];
    });
    afterAll(async () => {
        await medicineRepository.deleteAll();
        await userRepository.deleteAll();
        await mongoose.connection.close();
    });

    afterEach(async () => {
        await shopRepository.deleteAll();
    });

    describe("GET /api/v2/shops/", () => {
        it("should return all shops", async () => {
            await shopService.createShop(SHOP_DATA, jwtManager.verifyJwt(adminToken));

            const res = await request(app.getInstance())
                .get("/api/v2/shops");
            
            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBeGreaterThanOrEqual(1);
        });
    });

    describe("GET /api/v2/shops/:id", () => {
        it("should return a shop", async () => {
            const { _id: id } = await shopService.createShop(SHOP_DATA, jwtManager.verifyJwt(adminToken));

            const res = await request(app.getInstance())
                .get(`/api/v2/shops/${id}`);
            
            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe(SHOP_DATA.name);
            expect(res.body.medicines.length).toBeGreaterThanOrEqual(1);
            expect(res.body.medicines[0].name).toBe(SECOND_MEDICINE_DATA.name);
            expect(res.body.medicines[0].isFavorite).toBe(SECOND_MEDICINE_DATA.isFavorite);
            expect(res.body.medicines[0].price).toBeCloseTo(SECOND_MEDICINE_DATA.price);
        });

        it("should return a medicine with sorted by price medicines", async () => {
            const { _id: id } = await shopRepository.create(SHOP_DATA);
            const res = await request(app.getInstance())
                .get(`/api/v2/shops/${id}?sortByPrice=true`);
            
            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe(SHOP_DATA.name);
            expect(res.body.medicines[0].name).toBe(MEDICINE_DATA.name);
            expect(res.body.medicines[1].name).toBe(SECOND_MEDICINE_DATA.name);
        });

        it("should be returned message that the object was not found", async () => {
            const res = await request(app.getInstance())
                .get(`/api/v2/shops/00004d6a0000b9219d880000`);
            
            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual(NOT_FOUND_MESSAGE);
        });
    });

    describe("POST /api/v2/shops", () => {
        it("should return created shop", async () => {
            const res = await request(app.getInstance())
                .post("/api/v2/shops")
                .send(SHOP_DATA)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(res.statusCode).toBe(201);
            expect(res.body.name).toBe(SHOP_DATA.name);
            expect(res.body.medicines.length).toBeGreaterThanOrEqual(1);
        });

        it("should return message that user does not have access to the resource", async () => {
            const res = await request(app.getInstance())
                .post("/api/v2/shops")
                .send(SHOP_DATA)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${regularToken}`);

            expect(res.statusCode).toBe(403);
            expect(res.body).toEqual(NOT_ACCESS_RESOURCE_MESSAGE);
        });
    });

    describe("PATCH /api/v2/shops/:id", () => {
        it("should update a shop", async () => {
            const { _id: id } = await shopService.createShop(SHOP_DATA, jwtManager.verifyJwt(adminToken));

            const res = await request(app.getInstance())
                .patch(`/api/v2/shops/${id}`)
                .send({ ...SHOP_DATA, name: 'VitalMed' })
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${adminToken}`);
            
            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe("VitalMed");
            expect(res.body.medicines.length).toBeGreaterThanOrEqual(1);
        });

        it("should be returned message that the object was not found", async () => {
            const res = await request(app.getInstance())
                .patch(`/api/v2/shops/00004d6a0000b9219d880000`)
                .send({ ...SHOP_DATA, name: 'VitalMed' })
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${adminToken}`);
            
            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual(NOT_FOUND_MESSAGE);
        });

        it("should return a message that the user is not authorized", async () => {
            const { _id: id } = await shopService.createShop(SHOP_DATA, jwtManager.verifyJwt(adminToken));

            const res = await request(app.getInstance())
                .patch(`/api/v2/shops/${id}`)
                .send({ ...SHOP_DATA, name: 'VitalMed' });
            
            expect(res.statusCode).toBe(401);
            expect(res.body).toEqual(NOT_AUTHORIZED_MESSAGE);
        });
    });

    describe("DELETE /api/v2/shops/:id", () => {
        it("should delete a shop", async () => {
            const { _id: id } = await shopService.createShop(SHOP_DATA, jwtManager.verifyJwt(adminToken));

            const res = await request(app.getInstance())
                .delete(`/api/v2/shops/${id}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(res.statusCode).toBe(204);
            expect(res.body).toStrictEqual({});
        });

        it("should be returned message that the object was not found", async () => {
            const res = await request(app.getInstance())
                .delete(`/api/v2/shops/00004d6a0000b9219d880000`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${adminToken}`);
            
            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual(NOT_FOUND_MESSAGE);
        });

        it("should return a message that the user is not authorized", async () => {
            const { _id: id } = await shopService.createShop(SHOP_DATA, jwtManager.verifyJwt(adminToken));

            const res = await request(app.getInstance())
                .delete(`/api/v2/shops/${id}`);
            
            expect(res.statusCode).toBe(401);
            expect(res.body).toEqual(NOT_AUTHORIZED_MESSAGE);
        });
    });
});