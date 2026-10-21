import * as authService from "./auth.service";
import * as zod from "./auth.schemas";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  const valResult = zod.registerSchema.safeParse(req.body);

  if (!valResult.success) {
    res.status(400).json({ errors: valResult.error.issues });
    return;
  }

  const registerResult = await authService.register(valResult.data);
  res.status(201).json(registerResult);
};

export const login = async (req: Request, res: Response) => {
  const valResult = zod.loginSchema.safeParse(req.body);

  if (!valResult.success) {
    res.status(400).json({ errors: valResult.error.issues });
    return;
  }

  const loginResult = await authService.login(valResult.data);
  res.status(200).json(loginResult);
};