// db.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
    if (!MONGODB_URI) {
        console.error('MongoDB connection URI is missing. Set MONGO_URI in .env file.');
        process.exit(1); // Exit the process with failure
    }

    try {
        const conn = await mongoose.connect(MONGODB_URI, {
            // Use these options if you're using Mongoose versions prior to 4.11.0
            // Otherwise, remove these options as they're deprecated
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit the process with failure
    }
};

export default connectDB;
