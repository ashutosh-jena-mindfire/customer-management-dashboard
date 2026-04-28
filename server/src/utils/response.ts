import type { Response } from 'express';

const SUCCESS_STATUS = 200;

export const sendSuccess = (res: Response, data: unknown, message = 'Success') => {
  res.status(SUCCESS_STATUS).json({
    success: true,
    message,
    data
  });
};
