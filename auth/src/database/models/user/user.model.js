import { Schema, model } from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         user:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               description: The user ID
 *               example: 66004d6a26f7b9219d887696
 *             name:
 *               type: string
 *               description: User name
 *               example: Vova
 *             email:
 *               type: string
 *               description: User email address
 *               example: vova234@gmail.com
 *             phone:
 *               type: string
 *               description: User phone number
 *               example: 380975647321
 *             address:
 *               type: string
 *               description: Address of the user's place of residence
 *               example: Naukova Street 34
 *             type:
 *               type: string
 *               description: The user type. It can be "admin" or "regular"
 *               example: admin
 *             updatedAt:
 *               type: string
 *               description: time of the last update
 *               example: 2024-03-24T15:57:30.439+00:00
 *             createdAt:
 *               type: string
 *               description: creation time
 *               example: 2024-03-24T15:57:30.439+00:00
 *         accessToken:
 *           type: string
 *           description: JWT token
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDk1Y2E3NTI2YjcxYmM4MzhlNzgzZSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTcxMTg4OTU3NX0.xjaL643S_pGMlgG9AOZrGgP72ZkdG2NO1qhDknJ-Nc8
 *     SignUpData:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: User name
 *           example: Vova
 *         email:
 *           type: string
 *           description: User email address
 *           example: vova234@gmail.com
 *         password:
 *           type: string
 *           description: User password
 *           example: vova234
 *         phone:
 *           type: string
 *           description: User phone number
 *           example: 380975647321
 *         address:
 *           type: string
 *           description: Address of the user's place of residence
 *           example: Naukova Street 34
 *         type:
 *           type: string
 *           description: The user type. It can be "admin" or "regular"
 *           example: admin
 *     SignInData:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: User email address
 *           example: vova234@gmail.com
 *         password:
 *           type: string
 *           description: User password
 *           example: vova234
 */

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const userModel = model('User', userSchema, 'users');

export { userModel };