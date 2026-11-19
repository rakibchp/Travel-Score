import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { env } from './config/env.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { v1Router } from './routes/index.js';

/**
 * Builds the Express application without starting a server, so the same app
 * runs locally (src/server.ts) and on Vercel (api/index.ts).
 */
export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  // Vercel (and most hosts) sit behind one proxy hop; needed for correct client IPs in rate limiting.
  app.set('trust proxy', 1);

  app.use(helmet());
  app.use(
    cors({
      origin(origin, callback) {
        // Same-origin requests, curl and server-to-server calls send no Origin header.
        if (!origin || env.CORS_ORIGINS.includes(origin)) return callback(null, true);
        return callback(null, false);
      },
      credentials: true, // refresh-token cookie (Phase 4)
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      maxAge: 600,
    }),
  );
  app.use(express.json({ limit: '100kb' }));
  app.use(cookieParser());

  app.use('/api', apiLimiter);
  app.use('/api/v1', v1Router);

  app.get('/', (_req, res) => {
    res.json({ success: true, data: { name: 'Explore Bangladesh API', docs: '/api/v1/health' } });
  });

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
