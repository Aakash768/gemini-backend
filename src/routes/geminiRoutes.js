import express from 'express';
import { processText } from '../controllers/geminiController.js';

const router = express.Router();
router.post('/process', processText);
export default router;
