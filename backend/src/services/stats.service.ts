import { Destination } from '../models/Destination.js';
import { DestinationCategory } from '../models/DestinationCategory.js';
import { District } from '../models/District.js';
import { Division } from '../models/Division.js';

export type OverviewStats = {
  totalDestinations: number;
  totalDistricts: number;
  totalDivisions: number;
  totalCategories: number;
};

/** Site-wide totals shown on the landing page. Computed from the database every time. */
export async function getOverviewStats(): Promise<OverviewStats> {
  const [totalDestinations, totalDistricts, totalDivisions, totalCategories] = await Promise.all([
    Destination.countDocuments({ isActive: true }),
    District.estimatedDocumentCount(),
    Division.estimatedDocumentCount(),
    DestinationCategory.countDocuments({ isActive: true }),
  ]);

  return { totalDestinations, totalDistricts, totalDivisions, totalCategories };
}
