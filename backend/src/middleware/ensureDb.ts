import type { RequestHandler } from 'express';
import { connectDB } from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * Opens (or reuses) the cached MongoDB connection before handlers that need it.
 * If the database can't be reached, responds 503 rather than hanging.
 */
export const ensureDb: RequestHandler = async (_req, _res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[db] connection failed:', err instanceof Error ? err.message : err);
    next(ApiError.unavailable('Database is unavailable. Please try again shortly.'));
  }
};
