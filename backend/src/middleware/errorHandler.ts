import type { ErrorRequestHandler, RequestHandler } from 'express';
import mongoose from 'mongoose';
import { ZodError } from 'zod';
import { isProduction } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

export const notFoundHandler: RequestHandler = (req, _res, next) => {
  next(ApiError.notFound(`Route not found: ${req.method} ${req.path}`));
};

/** Driver/Mongoose errors that mean "database unreachable" rather than a bug. */
const DB_UNAVAILABLE_ERRORS = new Set([
  'MongooseServerSelectionError',
  'MongoServerSelectionError',
  'MongoNetworkError',
  'MongoNetworkTimeoutError',
  'MongoNotConnectedError',
  'MongoTopologyClosedError',
]);

type MongoDuplicateError = { code: number; keyValue?: Record<string, unknown> };

function isDuplicateKeyError(err: unknown): err is MongoDuplicateError {
  return typeof err === 'object' && err !== null && (err as { code?: unknown }).code === 11000;
}

/**
 * Converts every thrown error into the standard error envelope.
 * Express 5 forwards rejected promises from async handlers here automatically.
 */
export const errorHandler: ErrorRequestHandler = (err: unknown, _req, res, _next) => {
  let apiError: ApiError;

  if (err instanceof ApiError) {
    apiError = err;
  } else if (err instanceof ZodError) {
    apiError = ApiError.validation(
      err.issues.map((i) => ({ path: i.path.join('.'), message: i.message })),
    );
  } else if (err instanceof mongoose.Error.CastError) {
    apiError = ApiError.badRequest(`Invalid value for ${err.path}`);
  } else if (err instanceof mongoose.Error.ValidationError) {
    apiError = ApiError.validation(
      Object.values(err.errors).map((e) => ({ path: e.path, message: e.message })),
    );
  } else if (isDuplicateKeyError(err)) {
    apiError = ApiError.conflict('A record with this value already exists', {
      fields: Object.keys(err.keyValue ?? {}),
    });
  } else if (
    typeof err === 'object' &&
    err !== null &&
    (err as { type?: string }).type === 'entity.parse.failed'
  ) {
    apiError = ApiError.badRequest('Malformed JSON body');
  } else if (
    typeof err === 'object' &&
    err !== null &&
    (err as { type?: string }).type === 'entity.too.large'
  ) {
    apiError = new ApiError(413, 'BAD_REQUEST', 'Request body too large');
  } else if (err instanceof Error && DB_UNAVAILABLE_ERRORS.has(err.name)) {
    apiError = ApiError.unavailable('Database is unavailable. Please try again shortly.');
  } else {
    apiError = new ApiError(500, 'INTERNAL_ERROR', 'Something went wrong');
  }

  if (apiError.statusCode >= 500) {
    // eslint-disable-next-line no-console
    console.error('[error]', err);
  }

  res.status(apiError.statusCode).json({
    success: false,
    error: {
      code: apiError.code,
      message: apiError.message,
      ...(apiError.details !== undefined ? { details: apiError.details } : {}),
      ...(!isProduction && apiError.statusCode >= 500 && err instanceof Error
        ? { debug: err.message }
        : {}),
    },
  });
};
