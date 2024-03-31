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

describe("/api/v1/orders", () => {
    beforeAll(async () => {
        await mongoose.connect(MONGO_URL);

        const { user: { _id: adminId } } = await userService.createUser(ADMIN_USER);
        const { _id: cartId } = await cartService.createCart(CART_DATA);

        ORDER_DATA.user = adminId;
        ORDER_DATA.shoppingCart = cartId;
    });
    afterAll(async () => {
        await userRepository.deleteAll();
        await cartRepository.deleteAll();
        await mongoose.connection.close();
    });

    afterEach(async () => {
        await orderRepository.deleteAll();
    });

    describe("GET /api/v1/orders/:id", () => {
        it("should return an order", async () => {
            const { _id: id } = await orderService.createOrder(ORDER_DATA);

            const res = await request(app.getInstance())
                .get(`/api/v1/orders/${id}`);
            
            expect(res.statusCode).toBe(200);
            expect(res.body.user).toBeDefined();
            expect(res.body.shoppingCart).toBeDefined();
            expect(res.body.finalSum).toBeCloseTo(0.00);
        });

        it("should be returned message that the object was not found", async () => {
            const res = await request(app.getInstance())
                .get(`/api/v1/orders/00004d6a0000b9219d880000`);
            
            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual(NOT_FOUND_MESSAGE);
        });
    });

    describe("POST /api/v1/orders", () => {
        it("should return created order", async () => {
            const res = await request(app.getInstance())
                .post("/api/v1/orders")
                .send(ORDER_DATA);

            expect(res.statusCode).toBe(201);
            expect(res.body.user).toBeDefined();
            expect(res.body.shoppingCart).toBeDefined();
            expect(res.body.finalSum).toBeCloseTo(0.00);
        });
    });

    describe("DELETE /api/v1/orders/:id", () => {
        it("should delete an order", async () => {
            const { _id: id } = await orderService.createOrder(ORDER_DATA);

            const res = await request(app.getInstance())
                .delete(`/api/v1/orders/${id}`);

            expect(res.statusCode).toBe(204);
            expect(res.body).toStrictEqual({});
        });

        it("should be returned message that the object was not found", async () => {
            const res = await request(app.getInstance())
                .delete(`/api/v1/orders/00004d6a0000b9219d880000`);
            
            expect(res.statusCode).toBe(404);
            expect(res.body).toEqual(NOT_FOUND_MESSAGE);
        });
    });
});