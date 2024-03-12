import { Request, Response } from "express";
import { geminiTextModel } from "../config/geminiTextModel";
const admin = require("../config/firebaseInitialization");

export const getGeminiResponseForText = async (req: Request, res: Response) => {
  try {
    const { user_prompt, story_id, length_setting, creativity_value } =
      req.body;
    const user_uid = req.user?.uid;

    if (!user_prompt) {
      return res.status(400).json({
        success: false,
        error: "Prompt is required in the request body",
      });
    }

    const prompt = `You will be given a user-provided description. Respond creatively using the following settings:
          * Output Length: ${length_setting}
          * Creativity: ${creativity_value} (Ranged from 0 to 1)
    
          User Description: ${user_prompt}`;

    const result = await geminiTextModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const userDocRef = admin.firestore().collection("Users").doc(user_uid);

    const promptAndAnswerStorage = await userDocRef
      .collection("Stories")
      .doc(story_id)
      .collection("AI_Conversation")
      .add({ prompt: user_prompt, answer: text });

    res.status(200).json({ success: true, data: text });
  } catch (error) {
    console.error("Error getting Gemini response:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
