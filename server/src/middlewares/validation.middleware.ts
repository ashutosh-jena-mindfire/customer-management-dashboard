import type { Request, Response, NextFunction } from 'express';

// Define a type for the validator function
type ValidatorFn = (req: Request, res: Response, next: NextFunction) => void;

export const validate = (validator: ValidatorFn) => {
  return (req: Request, res: Response, next: NextFunction) => {
    validator(req, res, next);
  };
};
