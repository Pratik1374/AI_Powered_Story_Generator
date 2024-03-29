import { authMiddleware } from "middlewares/authMiddleware";
import { getAIConversationsController, getAllStoriesController, getEditorContentController, newStoryController, saveEditorContentController, validateStoryIdController } from "../controllers/storyController";
import express from "express";


const router = express.Router();

router.post("/add-new-story", newStoryController);
router.post("/validate-story-id", validateStoryIdController);
router.get("/get-ai-conversations/:story_id", getAIConversationsController);
router.get("/get-all-stories", getAllStoriesController);
router.post("/save-editor-content/:story_id", saveEditorContentController);
router.get("/get-editor-content/:story_id", getEditorContentController);

export default router;