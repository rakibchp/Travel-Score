import type { RequestHandler } from 'express';
import type { z } from 'zod';

/**
 * Validates req.query / req.body / req.params with a zod schema and stores the
 * parsed result in res.locals[source]. (Express 5 makes req.query read-only,
 * so we never write back to it.) Errors go to the central error handler.
 */
export function validate<S extends z.ZodType>(source: 'query' | 'body' | 'params', schema: S): RequestHandler {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      next(result.error);
      return;
    }
    res.locals[source] = result.data;
    next();
  };
}
