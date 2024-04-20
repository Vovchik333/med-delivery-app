import path from "path";
import fs from "fs";
import { createLogger, format, transports } from "winston";

let dir = path.resolve('logs');

if(!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

const customFormat = format.printf(({ level, message, timestamp }) => 
    `[${timestamp}] [${level.toUpperCase()}]: ${message}`
);

const logger = createLogger({
    level: 'debug',
    format: format.combine(format.timestamp(), customFormat),
    transports: [
        new transports.File({
            filename: 'logs/app-logs.log'
        }),
        new transports.File({
            level: 'error',
            filename: 'logs/error-logs.log'
        }),
        new transports.Console()
    ],
    exitOnError: false
});

export {
    logger
}