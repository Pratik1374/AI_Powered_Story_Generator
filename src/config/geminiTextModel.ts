import * as dotenv from 'dotenv';
dotenv.config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const api_key = process.env.GEMINI_API_KEY;

if (!api_key) {
  throw new Error('Invalid/Missing environment variable: "GEMINI_API_KEY"');
}

const genAI = new GoogleGenerativeAI(api_key);

export const geminiTextModel = genAI.getGenerativeModel({
  model: "gemini-pro",
});
