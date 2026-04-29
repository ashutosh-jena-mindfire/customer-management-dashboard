import * as service from './customer.service';
import * as response from '../../utils/response';
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
    const data = service.getCustomers();
    response.sendSuccess(res, data);
  } catch (err) {
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
