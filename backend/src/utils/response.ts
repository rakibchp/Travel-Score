import type { Response } from 'express';

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

/** Consistent success envelope: { success: true, data, meta? } */
export function sendSuccess<T>(res: Response, data: T, meta?: PaginationMeta, status = 200) {
  return res.status(status).json(meta ? { success: true, data, meta } : { success: true, data });
}
