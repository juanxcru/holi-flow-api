import { NextFunction, Request, Response } from 'express';

interface AppError {
  message: string;
  statusCode: number;
  code?: string;
}

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
};

export const isAppError = (err: unknown): err is AppError =>
  typeof err === 'object' &&
  err !== null &&
  typeof (err as AppError).statusCode === 'number';

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (isAppError(err)) {
    if (err.statusCode >= 500) {
      console.error(`[error] ${req.method} ${req.originalUrl}`, err);
    }
    res.status(err.statusCode).json({ message: err.message, code: err.code });
    return;
  }

  console.error(`[error] ${req.method} ${req.originalUrl}`, err);

  if (res.headersSent) {
    return;
  }

  res.status(500).json({ message: 'internal server error' });
};