import { authMiddleware } from "middlewares/authMiddleware";
import { getAIConversationsController, newStoryController, validateStoryIdController } from "../controllers/storyController";
import express from "express";


const router = express.Router();

router.post("/add-new-story", newStoryController);
router.post("/validate-story-id", validateStoryIdController)
router.post("/get-ai-conversations", getAIConversationsController);


export default router;