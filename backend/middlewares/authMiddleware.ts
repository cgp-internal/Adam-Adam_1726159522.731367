import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY || 'secret';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ error: 'Please authenticate.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.body.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send({ error: 'Invalid token.' });
  }
}