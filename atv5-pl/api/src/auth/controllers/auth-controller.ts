import { Request, Response } from "express";
import { auth } from "../services/auth-service";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const token = await auth(email, password);
    
    // Para incluir o id da empresa na resposta
    const decodedToken = jwt.decode(token) as { id: number, email: string };
    const empresa_id = decodedToken?.id;

    res.json({ token, empresa_id }); 
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};
