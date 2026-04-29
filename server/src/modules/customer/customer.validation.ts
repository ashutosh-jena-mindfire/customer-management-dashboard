import ApiError from '../../utils/ApiError';
import { customerSchema } from '@shared/schemas/customer.schema';
import type { Request, Response, NextFunction } from 'express';

const BAD_REQUEST_STATUS = 400;
const REQUIRED_FIELD_MESSAGES = new Set(['Name is required', 'Email is required', 'Phone is required']);

export const validateCreateCustomer = (req: Request, _res: Response, next: NextFunction) => {
  const validationResult = customerSchema.safeParse(req.body);

  if (!validationResult.success) {
    const message = validationResult.error.issues[0]?.message;

    return next(
      new ApiError(
        BAD_REQUEST_STATUS,
        message && REQUIRED_FIELD_MESSAGES.has(message) ? 'All fields are required' : message || 'Invalid customer data'
      )
    );
  }

  req.body = validationResult.data;
  next();
};
