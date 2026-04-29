import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { NextFunction, Request, Response } from 'express';

import ApiError from '../src/utils/ApiError.ts';
import { validateCreateCustomer } from '../src/modules/customer/customer.validation.ts';

const createRequest = (body: unknown): Request => ({ body }) as Request;
const response = {} as Response;

describe('validateCreateCustomer', () => {
  it('passes validation when all required fields are present', () => {
    const req = createRequest({
      name: ' Ada Lovelace ',
      email: 'ADA@EXAMPLE.COM ',
      phone: '911234567890'
    });
    let nextArgument: unknown = 'not called';
    const next: NextFunction = (error?: unknown) => {
      nextArgument = error;
    };

    validateCreateCustomer(req, response, next);

    assert.equal(nextArgument, undefined);
    assert.deepEqual(req.body, {
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      phone: '911234567890'
    });
  });

  it('returns a bad request error when any required field is missing or blank', () => {
    let nextArgument: unknown;
    const next: NextFunction = (error?: unknown) => {
      nextArgument = error;
    };

    validateCreateCustomer(
      createRequest({
        name: 'Ada Lovelace',
        email: '   ',
        phone: '1234567890'
      }),
      response,
      next
    );

    assert.ok(nextArgument instanceof ApiError);
    assert.equal(nextArgument.statusCode, 400);
    assert.equal(nextArgument.message, 'All fields are required');
  });

  it('returns a bad request error when email format is invalid', () => {
    let nextArgument: unknown;
    const next: NextFunction = (error?: unknown) => {
      nextArgument = error;
    };

    validateCreateCustomer(
      createRequest({
        name: 'Ada Lovelace',
        email: 'ada.example.com',
        phone: '1234567890'
      }),
      response,
      next
    );

    assert.ok(nextArgument instanceof ApiError);
    assert.equal(nextArgument.statusCode, 400);
    assert.equal(nextArgument.message, 'Email must be valid');
  });

  it('returns a bad request error when phone format is invalid', () => {
    let nextArgument: unknown;
    const next: NextFunction = (error?: unknown) => {
      nextArgument = error;
    };

    validateCreateCustomer(
      createRequest({
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        phone: 'call-me'
      }),
      response,
      next
    );

    assert.ok(nextArgument instanceof ApiError);
    assert.equal(nextArgument.statusCode, 400);
    assert.equal(nextArgument.message, 'Phone number must be valid');
  });
});
