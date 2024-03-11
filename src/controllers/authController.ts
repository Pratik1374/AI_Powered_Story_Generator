import { Request, Response } from "express";
const admin = require("../config/firebaseInitialization");

const firestore = admin.firestore();

//add new user's details in database
export const signUpController = async (req: Request, res: Response) => {
  const { email, name, uid } = req.body;
  console.log(req.body);
  try {
    const userDocRef = admin.firestore().collection("Users").doc(uid);
    const result = await userDocRef.set({
      email,
      name,
    });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error creating new user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
};
