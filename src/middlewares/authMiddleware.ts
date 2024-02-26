import { NextFunction, Request, Response } from "express";
const admin = require("../config/firebaseInitialization");

interface DecodedToken {
  uid: string;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Unauthorized: Missing or invalid token" });
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const decodedToken: DecodedToken = await admin.auth().verifyIdToken(token);
    (req as Request & { user: DecodedToken }).user = decodedToken;
    return next();
  } catch (error) {
    console.error("Error verifying Firebase token:", error);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

export const requireSignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const idToken = req.headers.authorization;

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken: DecodedToken) => {
      (req as Request & { user: DecodedToken }).user = decodedToken;
      next();
    })
    .catch((error: any) => {
      console.log("Error verifying ID token:", error);
      res.status(401).json({ error: "Invalid token" });
    });
};
