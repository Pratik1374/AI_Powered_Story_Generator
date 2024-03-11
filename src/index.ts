import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import geminiRoutes from './routes/geminiRoute';
import authRoutes from './routes/authRoute'
import storyRoutes from './routes/storyRoute'
import {authMiddleware} from './middlewares/authMiddleware';

dotenv.config();

const app = express();

// Apply middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

//routes
app.use("/api/v1/auth",authRoutes);

// app.use((req, res, next) => {
//   authMiddleware(req, res, next);
// });

app.use('/api/v1/story',authMiddleware, storyRoutes)
app.use('/api/v1/response',authMiddleware, geminiRoutes);

if (!process.env.PORT) {
  throw new Error('Invalid/Missing environment variable: "PORT"');
}

const port = process.env.PORT || 5000;
// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});