import express from 'express';
import { getGeminiResponseForText } from '../controllers/geminiController';

const router = express.Router();

router.post('/response-for-text', getGeminiResponseForText);

export default router;