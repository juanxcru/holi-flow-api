import { NextFunction, Response } from 'express';
import Request from '../types/express';
import * as jwt from "jsonwebtoken";

const JWT_PUBLIC_KEY = process.env.SUPABASE_JWT_PUBLIC!.replace(/\\n/g, '\n');

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;

  if (!header || !header.toLowerCase().startsWith("bearer ")) {
    res.status(401).json({ message: 'Missing bearer token' });
    return;
  }

  const token = header.slice(7).trim();

  try {
    const payload = jwt.verify(token, JWT_PUBLIC_KEY, { algorithms: ['ES256'] }) as jwt.JwtPayload;

    if (!payload.sub || !payload.org_id || !payload.roles
    ) {
      res.status(403).json({ message: 'Token lacks required claims' });
      return;
    }

    req.user = {
      id: payload.sub,
      orgId: payload.org_id,
      roles: payload.roles ,
      accessToken: token
    };

  } catch (err) {
    if (err instanceof Error) {
      console.log("jwt error:", err.message)
    }
    res.status(401).json({ message: 'Invalid or expired token' });
    return;
  }

  next();
};


export default authMiddleware;