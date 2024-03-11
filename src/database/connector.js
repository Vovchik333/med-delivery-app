import mongoose from 'mongoose';
import { MONGO_URL } from '../config.js';
import { createShops } from './seeds/add-shops.js';

mongoose.connect(MONGO_URL);

mongoose.connection.on('connected', () => {
    console.log('MongoDB successfully connected');
});

mongoose.connection.on('error', (error) => {
    console.log(error);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB connection is disconnected');
});

process.on('SIGINT', () => {
    mongoose.connection.close();
    console.log('MongoDB connection disconnected through app termination');
    process.exit(0);
});

createShops();

export const connection = mongoose.connection; 