// server.js (Entry Point)
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import geminiRoutes from './src/routes/geminiRoutes.js';
import errorHandler from './src/middlewares/errorHandler.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', geminiRoutes);

// Error handler
app.use(errorHandler);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'Server is running' });
});

const PORT = process.env.PORT || 3000;

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export for Vercel
export default app;