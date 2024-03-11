import { Request, Response } from "express";
import { geminiTextModel } from "../config/geminiTextModel";

export const getGeminiResponseForText = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res
        .status(400)
        .json({
          success: false,
          error: "Prompt is required in the request body",
        });
    }

    const result = await geminiTextModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    

    res.status(200).json({ success: true, data: text });
  } catch (error) {
    console.error("Error getting Gemini response:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
