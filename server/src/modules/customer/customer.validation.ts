import ApiError from '../../utils/ApiError';
import type { Request, Response, NextFunction } from 'express';

const BAD_REQUEST_STATUS = 400;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PHONE_DIGITS = 10;
const MAX_PHONE_DIGITS = 13;

const isPresentString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

const isValidPhone = (phone: string): boolean => {
  const normalizedPhone = phone.replace(/[\s()+-]/g, '');

  return (
    /^\d+$/.test(normalizedPhone) &&
    normalizedPhone.length >= MIN_PHONE_DIGITS &&
    normalizedPhone.length <= MAX_PHONE_DIGITS
  );
};

export const validateCreateCustomer = (req: Request, _res: Response, next: NextFunction) => {
  const { name, email, phone } = req.body;

  if (!isPresentString(name) || !isPresentString(email) || !isPresentString(phone)) {
    return next(new ApiError(BAD_REQUEST_STATUS, 'All fields are required'));
  }

  if (!EMAIL_REGEX.test(email.trim())) {
    return next(new ApiError(BAD_REQUEST_STATUS, 'Email must be valid'));
  }

  if (!isValidPhone(phone)) {
    return next(new ApiError(BAD_REQUEST_STATUS, 'Phone number must be valid'));
  }

  req.body = {
    ...req.body,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim()
  };

  next();
};
