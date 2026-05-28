import { NextFunction, Response } from 'express';
import Request from '../types/express';
import * as jwt from "jsonwebtoken";

const authMiddleware = (req:Request, res: Response, next:NextFunction) => {
  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer") ){
    const token = req.headers.authorization.substring(7);
    try{
      const secret = process.env.SUPABASE_JWT_PUBLIC!.replace(/\\n/g, '\n');
      const payload = jwt.verify(token, secret, { algorithms: ['ES256'] }) as jwt.JwtPayload;

      if (payload.sub && payload.org_id) {
        req.user = {
          id: payload.sub,
          orgId: payload.org_id
        }
      }else{        
        res.status(403).json({ message: 'Bad Message' })
        return;
      }

    }catch(err){
      if(err instanceof Error){
        console.log("jwt error:",err.message)
        res.status(401).json({ message: 'Unauthorized' })
        return;
      }
    }
    next();
  }else {
    res.status(401).json({ message: 'Unauthorized' })
    return;
  }

};


export default authMiddleware;