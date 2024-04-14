import request from "supertest";
import { app } from "../../../src/app";
import mongoose from "mongoose";
import { MONGO_URL } from "../../../src/config/config";
import { 
    cartRepository
} from "../../../src/database/repositories/repositories";
import { 
    CART_DATA,
    NOT_FOUND_MESSAGE
} from "../../data/constants/constants";
import * as cartService from "../../../src/services/cart/cart.service";

describe("/api/v1/carts", () => {
    beforeAll(async () => {
        await mongoose.connect(MONGO_URL);
    });
    afterAll(async () => {
        await mongoose.connection.close();
    });

    afterEach(async () => {
        await cartRepository.deleteAll();
    });

    describe("GET /api/v1/carts/:id", () => {
        it("should return a cart", async () => {
            const { _id: id } = await cartService.createCart(CART_DATA);

            const res = await request(app.getInstance())
                .get(`/api/v1/carts/${id}`);
            
            expect(res.statusCode).toBe(200);
            expect(res.body.items.length).toBe(0);
        });

        it("should be returned message that the object was not found", async () => {
            const res = await request(app.getInstance())
                .get(`/api/v1/carts/00004d6a0000b9219d880000`);
            
            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual(NOT_FOUND_MESSAGE);
        });
    });

    describe("POST /api/v1/carts", () => {
        it("should return created cart", async () => {
            const res = await request(app.getInstance())
                .post("/api/v1/carts")
                .send(CART_DATA);

            expect(res.statusCode).toBe(201);
            expect(res.body.items.length).toBe(0);
        });
    });

    describe("DELETE /api/v1/carts/:id", () => {
        it("should delete a cart", async () => {
            const { _id: id } = await cartService.createCart(CART_DATA);

            const res = await request(app.getInstance())
                .delete(`/api/v1/carts/${id}`);

            expect(res.statusCode).toBe(204);
            expect(res.body).toStrictEqual({});
        });

        it("should be returned message that the object was not found", async () => {
            const res = await request(app.getInstance())
                .delete(`/api/v1/carts/00004d6a0000b9219d880000`);
            
            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual(NOT_FOUND_MESSAGE);
        });
    });
});