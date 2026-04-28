import logger from '../utils/logger.js';
import type { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
}

export default (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  logger.error({
    message: err.message,
    stack: err.stack,
  });

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};
