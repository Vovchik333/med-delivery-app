import mongoose from 'mongoose';
import { MONGO_URL } from '../config/config.js';
import { logger } from '../helpers/logging/logger.js';

export const connectToDB = async () => {
    mongoose.connection.on('connected', () => {
        logger.info('MongoDB successfully connected');
    });

    mongoose.connection.on('error', (error) => {
        logger.error(error);
    });

    mongoose.connection.on('disconnected', () => {
        logger.info('MongoDB connection is disconnected');
    });

    process.on('SIGINT', () => {
        mongoose.connection.close();
        logger.info('MongoDB connection disconnected through app termination');
        process.exit(0);
    });

    await mongoose.connect(MONGO_URL);
}

export const connection = mongoose.connection; 