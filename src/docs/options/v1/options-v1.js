import { PORT } from "../../../config.js";

export const optionsV1 = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Med delivery API',
            version: '1.0.0',
            description: 'Express API for ordering medicines from different pharmacies.'
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