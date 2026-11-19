import { Router } from 'express';
import { getCategories, getDistricts, getDivisions } from '../controllers/reference.controller.js';
import { health, overview } from '../controllers/system.controller.js';
import { ensureDb } from '../middleware/ensureDb.js';
import { validate } from '../middleware/validate.js';
import { districtListQuery } from '../validators/reference.validators.js';

/** All v1 routes. Feature routers (destinations, auth, me, admin…) mount here in later phases. */
export const v1Router = Router();

// System
v1Router.get('/health', health);
v1Router.get('/stats/overview', ensureDb, overview);

// Reference data
v1Router.get('/divisions', ensureDb, getDivisions);
v1Router.get('/districts', validate('query', districtListQuery), ensureDb, getDistricts);
v1Router.get('/categories', ensureDb, getCategories);
