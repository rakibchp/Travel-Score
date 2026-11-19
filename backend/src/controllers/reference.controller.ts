import type { Request, Response } from 'express';
import { listCategories, listDistricts, listDivisions } from '../services/reference.service.js';
import { sendSuccess } from '../utils/response.js';
import type { DistrictListQuery } from '../validators/reference.validators.js';

const CACHE = 'public, s-maxage=300, stale-while-revalidate=3600';

export async function getDivisions(_req: Request, res: Response) {
  res.set('Cache-Control', CACHE);
  sendSuccess(res, await listDivisions());
}

export async function getDistricts(_req: Request, res: Response) {
  const query = res.locals.query as DistrictListQuery;
  res.set('Cache-Control', CACHE);
  sendSuccess(res, await listDistricts(query));
}

export async function getCategories(_req: Request, res: Response) {
  res.set('Cache-Control', CACHE);
  sendSuccess(res, await listCategories());
}
