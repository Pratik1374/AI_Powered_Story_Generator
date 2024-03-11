import { newStoryController } from "../controllers/storyController";
import express from "express";


const router = express.Router();

router.post("/add-new-story", newStoryController);

export default router;