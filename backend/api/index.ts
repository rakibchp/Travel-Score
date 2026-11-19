/**
 * Vercel serverless entry point.
 *
 * Vercel's Node runtime accepts an Express app as the request handler.
 * vercel.json rewrites every path to /api, so Express sees the original URL
 * (e.g. /api/v1/health) and does all routing itself.
 *
 * The database connection is opened lazily by the `ensureDb` middleware and
 * cached on globalThis, so warm invocations reuse it.
 */
import { createApp } from '../src/app.js';

const app = createApp();

export default app;
