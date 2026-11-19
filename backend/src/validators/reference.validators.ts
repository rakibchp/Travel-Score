import { z } from 'zod';

const slug = z
  .string()
  .trim()
  .toLowerCase()
  .max(60)
  .regex(/^[a-z0-9-]+$/, 'must be a slug (letters, numbers, hyphens)');

export const districtListQuery = z.object({
  division: slug.optional(),
});

export type DistrictListQuery = z.infer<typeof districtListQuery>;
