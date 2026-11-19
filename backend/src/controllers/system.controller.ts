import type { Request, Response } from 'express';
import { dbState } from '../config/db.js';
import { env } from '../config/env.js';
import { getOverviewStats } from '../services/stats.service.js';
import { sendSuccess } from '../utils/response.js';

/** Liveness check. Deliberately does not open a DB connection; it only reports state. */
export function health(_req: Request, res: Response) {
  sendSuccess(res, {
    status: 'ok',
    environment: env.NODE_ENV,
    database: dbState(),
    timestamp: new Date().toISOString(),
  });
}

export async function overview(_req: Request, res: Response) {
  const stats = await getOverviewStats();
  // Short CDN cache: totals change only when admins edit destinations.
  res.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
  sendSuccess(res, stats);
}
