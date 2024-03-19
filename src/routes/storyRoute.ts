import { authMiddleware } from "middlewares/authMiddleware";
import { getAIConversationsController, getAllStoriesController, newStoryController, validateStoryIdController } from "../controllers/storyController";
import express from "express";


const router = express.Router();

router.post("/add-new-story", newStoryController);
router.post("/validate-story-id", validateStoryIdController)
router.get("/get-ai-conversations/:story_id", getAIConversationsController);
router.get("/get-all-stories", getAllStoriesController);

export default router;