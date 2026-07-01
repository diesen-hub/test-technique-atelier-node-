import { Request, Response, NextFunction } from 'express';

interface HttpError extends Error {
  statusCode?: number;
}

export function errorHandler(err: HttpError, _req: Request, res: Response, _next: NextFunction): void {
  const status = err.statusCode ?? 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
}
