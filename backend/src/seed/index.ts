/**
 * npm run seed — idempotent seed of reference data.
 *
 * Upserts by slug, so it is safe to run repeatedly and will update names or
 * Bengali spellings if the JSON changes. It never deletes anything.
 * Destinations are seeded in Phase 2.
 */
import { readFileSync } from 'node:fs';
import { connectDB, disconnectDB } from '../config/db.js';
import { Destination } from '../models/Destination.js';
import { DestinationCategory } from '../models/DestinationCategory.js';
import { District } from '../models/District.js';
import { Division } from '../models/Division.js';
import { slugify } from '../utils/slugify.js';

type DivisionSeed = { name: string; nameBn: string; order: number };
type DistrictSeed = { name: string; nameBn: string; division: string };
type CategorySeed = { name: string; nameBn: string; icon: string; order: number };

function loadJson<T>(file: string): T {
  return JSON.parse(readFileSync(new URL(`./data/${file}`, import.meta.url), 'utf8')) as T;
}

async function seedDivisions() {
  const data = loadJson<DivisionSeed[]>('divisions.json');
  if (data.length !== 8) throw new Error(`Expected 8 divisions, found ${data.length}`);

  await Division.bulkWrite(
    data.map((d) => ({
      updateOne: {
        filter: { slug: slugify(d.name) },
        update: { $set: { name: d.name, nameBn: d.nameBn, order: d.order, slug: slugify(d.name) } },
        upsert: true,
      },
    })),
  );
  console.log(`   divisions: ${data.length}`);
}

async function seedDistricts() {
  const data = loadJson<DistrictSeed[]>('districts.json');
  if (data.length !== 64) throw new Error(`Expected 64 districts, found ${data.length}`);

  const divisions = await Division.find().select('_id name').lean();
  const divisionIdByName = new Map(divisions.map((d) => [d.name, d._id]));

  const ops = data.map((d) => {
    const divisionId = divisionIdByName.get(d.division);
    if (!divisionId) throw new Error(`District "${d.name}" references unknown division "${d.division}"`);
    const slug = slugify(d.name);
    return {
      updateOne: {
        filter: { slug },
        update: { $set: { name: d.name, nameBn: d.nameBn, slug, division: divisionId } },
        upsert: true,
      },
    };
  });

  await District.bulkWrite(ops);
  console.log(`   districts: ${data.length}`);
}

async function seedCategories() {
  const data = loadJson<CategorySeed[]>('categories.json');
  await DestinationCategory.bulkWrite(
    data.map((c) => {
      const slug = slugify(c.name);
      return {
        updateOne: {
          filter: { slug },
          update: {
            $set: { name: c.name, nameBn: c.nameBn, slug, icon: c.icon, order: c.order },
            $setOnInsert: { isActive: true },
          },
          upsert: true,
        },
      };
    }),
  );
  console.log(`   categories: ${data.length}`);
}

try {
  await connectDB();
  console.log('🌱 Seeding reference data…');
  // Make sure unique indexes exist before upserting (autoIndex is off in production).
  await Promise.all([
    Division.syncIndexes(),
    District.syncIndexes(),
    DestinationCategory.syncIndexes(),
    Destination.syncIndexes(),
  ]);
  await seedDivisions();
  await seedDistricts();
  await seedCategories();
  console.log('✅ Seed complete');
} catch (err) {
  console.error('❌ Seed failed:', err instanceof Error ? err.message : err);
  process.exitCode = 1;
} finally {
  await disconnectDB();
}
