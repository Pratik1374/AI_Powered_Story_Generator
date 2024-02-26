import { Request, Response } from "express";
const admin = require("../config/firebaseInitialization");
import { User } from "../model/userModel";

const firestore = admin.firestore();
const usersCollection = firestore.collection("Users");

export const signUpController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const userRecord = await admin.auth().createUser({ email, password });
    const token = await admin.auth().createCustomToken(userRecord.uid);
    res.status(200).json({ message: "User registration successful", token });
  } catch (error) {
    console.error("Error creating new user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
};

