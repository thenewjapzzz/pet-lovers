import { Request, Response } from "express";
import { auth } from "../services/auth-service";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const token = await auth(email, password);
    res.json({ token });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error ocurred" });
    }
  }
};
