import request from "supertest";
import { app } from "../../../src/app";
import mongoose from "mongoose";
import { MONGO_URL } from "../../../src/config";
import { 
    userRepository, 
    medicineRepository,
    cartItemRepository,
    cartRepository
} from "../../../src/database/repositories/repositories";
import { 
    ADMIN_USER,
    CART_DATA, 
    CART_ITEM_DATA, 
    MEDICINE_DATA,
    NOT_FOUND_MESSAGE
} from "../../data/constants/constants";
import * as cartItemService from "../../../src/services/cart-item/cart-item.service";
import * as medicineService from "../../../src/services/medicine/medicine.service";
import * as cartService from "../../../src/services/cart/cart.service";
import * as userService from "../../../src/services/user/user.service";
import { jwtManager } from "../../../src/helpers/jwt/jwt-manager";

describe("/api/v1/cart-items", () => {
    let shoppingCartId;

    beforeAll(async () => {
        await mongoose.connect(MONGO_URL);
    });
    afterAll(async () => {
        await medicineRepository.deleteAll();
        await cartRepository.deleteAll();
        await userRepository.deleteAll();
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        const { accessToken } = await userService.createUser(ADMIN_USER);
        const { _id: medicineId } = await medicineService.createMedicine(MEDICINE_DATA, jwtManager.verifyJwt(accessToken));
        const { _id: cartId } = await cartService.createCart(CART_DATA);

        CART_ITEM_DATA.item = medicineId;
        CART_ITEM_DATA.cartId = cartId;

        shoppingCartId = cartId;
    });
    afterEach(async () => {
        await cartItemRepository.deleteAll();
    });

    describe("GET /api/v1/cart-items/:id", () => {
        it("should return a cart item", async () => {
            const { _id: id } = await cartItemService.createCartItem(CART_ITEM_DATA);

            const res = await request(app.getInstance())
                .get(`/api/v1/cart-items/${id}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.quantity).toBe(1);
            expect(res.body.item).toHaveProperty('name');
            expect(res.body.item).toHaveProperty('price');
            expect(res.body.item).toHaveProperty('isFavorite');
        });

        it("should be returned message that the object was not found", async () => {
            const res = await request(app.getInstance())
                .get(`/api/v1/cart-items/00004d6a0000b9219d880000`);
            
            expect(res.statusCode).toBe(404);
            expect(res.body).toStrictEqual(NOT_FOUND_MESSAGE);
        });
    });

    describe("POST /api/v1/cart-items", () => {
        it("should return created cart item", async () => {
            const res = await request(app.getInstance())
                .post("/api/v1/cart-items")
                .send(CART_ITEM_DATA);

            expect(res.statusCode).toBe(201);
            expect(res.body.quantity).toBe(1);
            expect(res.body.item).toBeDefined();
        });

        it("should return the same object, but with an increased number by 1", async () => {
            const firstItemRes = await request(app.getInstance())
                .post("/api/v1/cart-items")
                .send(CART_ITEM_DATA);
            const secondItemRes = await request(app.getInstance())
                .post("/api/v1/cart-items")
                .send(CART_ITEM_DATA);
            const cartRes = await request(app.getInstance())
                .get(`/api/v1/carts/${shoppingCartId}`);
            
            expect(firstItemRes.statusCode).toBe(201);
            expect(secondItemRes.statusCode).toBe(201);
            expect(cartRes.statusCode).toBe(200);
            expect(firstItemRes.body.quantity).toBe(1);
            expect(secondItemRes.body.quantity).toBe(2);
            expect(cartRes.body.totalSum).toBeCloseTo(secondItemRes.body.quantity * cartRes.body.items[0].item.price);
        });
    });

    describe("PUT /api/v1/cart-items", () => {
        it("should return updated cart item", async () => {
            const { _id: id } = await cartItemService.createCartItem(CART_ITEM_DATA);

            const itemRes = await request(app.getInstance())
                .put(`/api/v1/cart-items/${id}`)
                .send({ ...CART_ITEM_DATA, quantity: 3});
            const cartRes = await request(app.getInstance())
                .get(`/api/v1/carts/${shoppingCartId}`);

            expect(itemRes.statusCode).toBe(200);
            expect(cartRes.statusCode).toBe(200);
            expect(itemRes.body.quantity).toBe(3);
            expect(itemRes.body.item).toBeDefined();
            expect(cartRes.body.totalSum).toBeCloseTo(itemRes.body.quantity * cartRes.body.items[0].item.price);
        });

        it("should be returned message that the object was not found", async () => {
            const res = await request(app.getInstance())
                .put(`/api/v1/cart-items/00004d6a0000b9219d880000`);

            expect(res.statusCode).toBe(404);
            expect(res.body).toStrictEqual(NOT_FOUND_MESSAGE);
        });
    });

    describe("DELETE /api/v1/cart-items/:id", () => {
        it("should delete a cart item", async () => {
            const { _id: id } = await cartItemService.createCartItem(CART_ITEM_DATA);

            const firstCartRes = await request(app.getInstance())
                .get(`/api/v1/carts/${shoppingCartId}`);
            const itemRes = await request(app.getInstance())
                .delete(`/api/v1/cart-items/${id}`);
            const secondCartRes = await request(app.getInstance())
                .get(`/api/v1/carts/${shoppingCartId}`);

            expect(itemRes.statusCode).toBe(204);
            expect(firstCartRes.statusCode).toBe(200);
            expect(secondCartRes.statusCode).toBe(200);
            expect(itemRes.body).toStrictEqual({});
            expect(firstCartRes.body.items.length).toBe(1);
            expect(secondCartRes.body.items.length).toBe(0);
            expect(firstCartRes.body.totalSum).toBeCloseTo(firstCartRes.body.items[0].item.price);
            expect(secondCartRes.body.totalSum).toBeCloseTo(0.00);
        });

        it("should be returned message that the object was not found", async () => {
            const res = await request(app.getInstance())
                .delete(`/api/v1/cart-items/00004d6a0000b9219d880000`);
            
            expect(res.statusCode).toBe(404);
            expect(res.body).toStrictEqual(NOT_FOUND_MESSAGE);
        });
    });
});