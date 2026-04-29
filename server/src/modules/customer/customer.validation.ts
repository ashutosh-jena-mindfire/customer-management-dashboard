import ApiError from '../../utils/ApiError';
import type { Request, Response, NextFunction } from 'express';

const BAD_REQUEST_STATUS = 400;
export const validateCreateCustomer = (req: Request, _res: Response, next: NextFunction) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return next(new ApiError(BAD_REQUEST_STATUS, 'All fields are required'));
  }

  next();
};
