import { rateLimit } from 'express-rate-limit';
import { env } from '../config/env.js';

/**
 * General API limiter.
 *
 * NOTE: the default in-memory store is per serverless instance, so on Vercel
 * this is best-effort. Phase 8 swaps in a shared store (Redis/Mongo) behind
 * this same export. Stricter limiters for auth/OTP routes arrive in Phase 4.
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: env.RATE_LIMIT_MAX,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(429).json({
      success: false,
      error: { code: 'RATE_LIMITED', message: 'Too many requests. Please slow down and try again.' },
    });
  },
});
