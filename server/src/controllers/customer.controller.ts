import * as service from '../services/customer.service.ts';
import * as response from '../utils/response.ts';
import type { Request, Response, NextFunction } from 'express';

export const createCustomer = (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = service.createCustomer(req.body);
    response.sendSuccess(res, data, 'Customer created');
  } catch (err) {
    next(err);
  }
};

export const getCustomers = (_req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Fetching customers');
    const data = service.getCustomers();
    response.sendSuccess(res, data);
  } catch (err) {
    console.log('Fetching customers');
    next(err);
  }
};

export const deleteCustomer = (req: Request, res: Response, next: NextFunction) => {
  try {
    service.deleteCustomer(req.params.id as string);
    response.sendSuccess(res, null, 'Customer deleted');
  } catch (err) {
    next(err);
  }
};
