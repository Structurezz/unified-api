import express from 'express';
import mongoose from 'mongoose';
import userRoutes from '../routes/userRoutes.js';
import transactionRoutes from '../routes/transactionRoutes.js';
import currencyRoutes from '../routes/currencyRoutes.js';
import fraudAlertRoutes from '../routes/fraudAlertRoutes.js';
import accountRoutes from '../routes/accountRoutes.js';
import rateLimiter from '../app/middleware/rateLimiter.js';
import authMiddleware from '../app/middleware/authMiddleware.js';
import errorMiddleware from '../app/middleware/errorMiddleware.js';
import connectDB from '../lib/config/db.js';
import dotenv from 'dotenv';


// Initialize Express app
const app = express();

// Load environment variables
dotenv.config();

// Middleware to parse JSON
app.use(express.json());

// Apply rate limiter
app.use(rateLimiter);

// Set up routes
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/transactions', authMiddleware, transactionRoutes);
app.use('/api/currencies', currencyRoutes);
app.use('/api/fraud-alerts', authMiddleware, fraudAlertRoutes);
app.use('/api/accounts', accountRoutes);

// Add this to your routes or server file temporarily
app.get('/test', (req, res) => {
    res.send('Test route working!');
});



// Error handling middleware (must be after routes)
app.use(errorMiddleware);

connectDB().then(() => {
    console.log('Database connected successfully');
}).catch(err => {
    console.error('Database connection error:', err);
    process.exit(1); // Exit process with failure
});
// Start the server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Export app and server
export { app, server };
