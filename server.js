// server.js (Entry Point)
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import geminiRoutes from './src/routes/geminiRoutes.js';
import errorHandler from './src/middlewares/errorHandler.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
  app.use(cors(corsOptions));

app.use(express.json());

// Routes
app.use('/api/gemini', geminiRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));