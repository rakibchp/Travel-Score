/**
 * npm run db:check — verifies MONGODB_URI works and prints collection counts.
 */
import mongoose from 'mongoose';
import { connectDB, disconnectDB } from '../config/db.js';

try {
  const started = Date.now();
  await connectDB();
  const db = mongoose.connection.db;
  if (!db) throw new Error('Connected but no database handle');
  const collections = await db.listCollections().toArray();
  console.log(`✅ Connected to "${db.databaseName}" in ${Date.now() - started} ms`);
  for (const c of collections.sort((a, b) => a.name.localeCompare(b.name))) {
    const count = await db.collection(c.name).estimatedDocumentCount();
    console.log(`   ${c.name.padEnd(24)} ${count}`);
  }
  if (collections.length === 0) console.log('   (no collections yet — run `npm run seed`)');
} catch (err) {
  console.error('❌ Could not connect:', err instanceof Error ? err.message : err);
  process.exitCode = 1;
} finally {
  await disconnectDB();
}
