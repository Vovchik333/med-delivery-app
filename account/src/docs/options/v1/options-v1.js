import { PORT } from "../../../config/config.js";

export const optionsV1 = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Authorization microservice API',
            version: '1.0.0',
            description: 'Express API for login and register in the system.'
        },
        servers: [{
            url: `http://localhost:${PORT}`
        }]
    },
    apis: [
        './src/routes/v1/*/*.routes.js', 
        './src/database/models/*/*.js',
        './src/helpers/error/*.js',
        './src/helpers/jwt/*.js'
    ]
}