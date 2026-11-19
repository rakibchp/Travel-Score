/**
 * Local development / traditional-host entry point.
 * On Vercel, api/index.ts is used instead and no server is started.
 */
import { createApp } from './app.js';
import { connectDB, disconnectDB } from './config/db.js';
import { env } from './config/env.js';

const app = createApp();

const server = app.listen(env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 API listening on http://localhost:${env.PORT}/api/v1  (${env.NODE_ENV})`);
});

// Connect eagerly in long-running mode so problems show up at startup.
// Requests still go through ensureDb, so the API recovers if Atlas was briefly unreachable.
connectDB()
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err: unknown) =>
    console.error('⚠️  MongoDB connection failed:', err instanceof Error ? err.message : err),
  );

function shutdown(signal: string) {
  console.log(`\n${signal} received, shutting down…`);
  server.close(() => {
    disconnectDB().finally(() => process.exit(0));
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
