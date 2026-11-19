import type { Types } from 'mongoose';
import { Destination } from '../models/Destination.js';
import { DestinationCategory } from '../models/DestinationCategory.js';
import { District } from '../models/District.js';
import { Division } from '../models/Division.js';
import { ApiError } from '../utils/ApiError.js';

/** Count active destinations grouped by a reference field -> Map<idString, count>. */
async function countActiveDestinationsBy(field: 'division' | 'district' | 'category') {
  const rows = await Destination.aggregate<{ _id: Types.ObjectId; count: number }>([
    { $match: { isActive: true } },
    { $group: { _id: `$${field}`, count: { $sum: 1 } } },
  ]);
  return new Map(rows.map((r) => [String(r._id), r.count]));
}

export async function listDivisions() {
  const [divisions, districtRows, destinationCounts] = await Promise.all([
    Division.find().sort({ order: 1, name: 1 }).lean(),
    District.aggregate<{ _id: Types.ObjectId; count: number }>([
      { $group: { _id: '$division', count: { $sum: 1 } } },
    ]),
    countActiveDestinationsBy('division'),
  ]);
  const districtCounts = new Map(districtRows.map((r) => [String(r._id), r.count]));

  return divisions.map((d) => ({
    id: String(d._id),
    name: d.name,
    nameBn: d.nameBn,
    slug: d.slug,
    description: d.description ?? null,
    image: d.image ?? null,
    districtCount: districtCounts.get(String(d._id)) ?? 0,
    destinationCount: destinationCounts.get(String(d._id)) ?? 0,
  }));
}

export async function listDistricts(filter: { division?: string }) {
  const query: Record<string, unknown> = {};

  if (filter.division) {
    const division = await Division.findOne({ slug: filter.division }).select('_id').lean();
    if (!division) throw ApiError.notFound(`Division not found: ${filter.division}`);
    query.division = division._id;
  }

  const [districts, destinationCounts] = await Promise.all([
    District.find(query)
      .sort({ name: 1 })
      .populate<{ division: { _id: Types.ObjectId; name: string; nameBn: string; slug: string } }>(
        'division',
        'name nameBn slug',
      )
      .lean(),
    countActiveDestinationsBy('district'),
  ]);

  return districts.map((d) => ({
    id: String(d._id),
    name: d.name,
    nameBn: d.nameBn,
    slug: d.slug,
    division: {
      id: String(d.division._id),
      name: d.division.name,
      nameBn: d.division.nameBn,
      slug: d.division.slug,
    },
    location: d.location ?? null,
    destinationCount: destinationCounts.get(String(d._id)) ?? 0,
  }));
}

export async function listCategories() {
  const [categories, destinationCounts] = await Promise.all([
    DestinationCategory.find({ isActive: true }).sort({ order: 1, name: 1 }).lean(),
    countActiveDestinationsBy('category'),
  ]);

  return categories.map((c) => ({
    id: String(c._id),
    name: c.name,
    nameBn: c.nameBn,
    slug: c.slug,
    icon: c.icon ?? null,
    destinationCount: destinationCounts.get(String(c._id)) ?? 0,
  }));
}
