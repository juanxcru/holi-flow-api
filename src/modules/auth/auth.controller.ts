import * as authService from "./auth.service";
import * as zod from "./auth.schemas";
import AuthException from "./auth.exceptions";
import { Request, Response } from "express";

export const registerController = async (req: Request, res: Response) => {
  const valResult = zod.registerSchema.safeParse(req.body);

  if (!valResult.success){
    res.status(400).json({ errors: valResult.error.issues });
    return;
  }

  try {

    const registerResult = await authService.register(valResult.data);
    res.status(201).json(registerResult);
    
  } catch (err) {
    
    if(err instanceof AuthException){
      res.status(err.statusCode).json({message: err.message, code: err.code});
    }else{
      console.log(valResult.data);
      console.log(`Error inesperado al intentar signup`);
      console.log(req.body);
      res.status(500).json({ message: "unexpected error" });
    }

  }

  return;
};

export const loginController = async (req: Request, res: Response) => {
  const valResult = zod.loginSchema.safeParse(req.body);

  if (!valResult.success) {
    res.status(400).json({ errors: valResult.error.issues });
    return;
  }

  try {

    const loginResult = await authService.login(valResult.data);
    res.status(200).json(loginResult);

  } catch (err) {

    if (err instanceof AuthException) {
      console.log("Error en auth");
      res.status(err.statusCode).json({ message: err.message, code: err.code });
    } else {
      console.log(valResult.data);
      console.log(`Error inesperado al intentar signing`);
      console.log(req.body);
      res.status(500).json({ message: "unexpected error" });
    }

  }
  return;
};
