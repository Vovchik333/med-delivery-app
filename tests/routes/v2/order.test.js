import request from "supertest";
import { app } from "../../../src/app";
import mongoose from "mongoose";
import { MONGO_URL } from "../../../src/config";
import { 
    userRepository, 
    cartRepository,
    orderRepository
} from "../../../src/database/repositories/repositories";
import { 
    ADMIN_USER, 
    NOT_FOUND_MESSAGE,
    CART_DATA,
    ORDER_DATA
} from "../../data/constants/constants";
import * as orderService from "../../../src/services/order/order.service";
import * as cartService from "../../../src/services/cart/cart.service";
import * as userService from "../../../src/services/user/user.service";

describe("/api/v2/orders", () => {
    let adminToken;

    beforeAll(async () => {
        await mongoose.connect(MONGO_URL);

        const { user: { _id: adminId }, accessToken } = await userService.createUser(ADMIN_USER);
        const { _id: cartId } = await cartService.createCart(CART_DATA);

        ORDER_DATA.user = adminId;
        ORDER_DATA.shoppingCart = cartId;

        adminToken = accessToken;
    });
    afterAll(async () => {
        await userRepository.deleteAll();
        await cartRepository.deleteAll();
        await mongoose.connection.close();
    });

    afterEach(async () => {
        await orderRepository.deleteAll();
    });

    describe("GET /api/v2/orders", () => {
        it("should return an array of orders", async () => {
            await orderService.createOrder(ORDER_DATA);

            const res = await request(app.getInstance())
                .get(`/api/v2/orders`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBeGreaterThanOrEqual(1);
        });
    });

    describe("GET /api/v2/orders/:id", () => {
        it("should return an order", async () => {
            const { _id: id } = await orderService.createOrder(ORDER_DATA);

            const res = await request(app.getInstance())
                .get(`/api/v2/orders/${id}`);
            
            expect(res.statusCode).toBe(200);
            expect(res.body.user).toBeDefined();
            expect(res.body.shoppingCart).toBeDefined();
            expect(res.body.finalSum).toBeCloseTo(0.00);
        });

        it("should be returned message that the object was not found", async () => {
            const res = await request(app.getInstance())
                .get(`/api/v2/orders/00004d6a0000b9219d880000`);
            
            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual(NOT_FOUND_MESSAGE);
        });
    });

    describe("POST /api/v2/orders", () => {
        it("should return created order", async () => {
            const res = await request(app.getInstance())
                .post("/api/v2/orders")
                .send(ORDER_DATA);

            expect(res.statusCode).toBe(201);
            expect(res.body.user).toBeDefined();
            expect(res.body.shoppingCart).toBeDefined();
            expect(res.body.finalSum).toBeCloseTo(0.00);
        });
    });

    describe("DELETE /api/v2/orders/:id", () => {
        it("should delete an order", async () => {
            const { _id: id } = await orderService.createOrder(ORDER_DATA);

            const res = await request(app.getInstance())
                .delete(`/api/v2/orders/${id}`);

            expect(res.statusCode).toBe(204);
            expect(res.body).toStrictEqual({});
        });

        it("should be returned message that the object was not found", async () => {
            const res = await request(app.getInstance())
                .delete(`/api/v2/orders/00004d6a0000b9219d880000`);
            
            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual(NOT_FOUND_MESSAGE);
        });
    });
});