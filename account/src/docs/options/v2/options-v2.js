import { PORT } from "../../../config/config.js";

export const optionsV2 = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Authorization microservice API',
            version: '2.0.0',
            description: 'Express API for login and register in the system.'
        },
        servers: [{
            url: `http://localhost:${PORT}`
        }]
    },
    apis: [
        './src/routes/v2/*/*.routes.js',
        './src/database/models/*/*.js',
        './src/helpers/error/*.js',
        './src/helpers/jwt/*.js'
    ]
}