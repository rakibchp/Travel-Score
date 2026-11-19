import mongoose from 'mongoose';
import { env } from './env.js';

/**
 * Serverless-safe MongoDB connection.
 *
 * On Vercel, a function instance may serve many invocations. We cache the
 * connection *promise* on globalThis so that:
 *  - warm invocations reuse the open connection, and
 *  - concurrent cold-start requests share one connection attempt.
 * If an attempt fails, the cache is cleared so the next request retries.
 */
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalForMongoose = globalThis as typeof globalThis & { __mongooseCache?: MongooseCache };

const cache: MongooseCache = (globalForMongoose.__mongooseCache ??= { conn: null, promise: null });

// Fail fast when disconnected instead of queueing queries until a timeout.
mongoose.set('bufferCommands', false);
mongoose.set('strictQuery', true);

export async function connectDB(): Promise<typeof mongoose> {
  if (cache.conn && mongoose.connection.readyState === 1) {
    return cache.conn;
  }

  if (!cache.promise) {
    cache.promise = mongoose
      .connect(env.MONGODB_URI, {
        maxPoolSize: 5, // keep well under Atlas free-tier connection limits across instances
        minPoolSize: 0,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 30000,
        autoIndex: env.NODE_ENV !== 'production', // build indexes via seed/migration in production
      })
      .then((m) => {
        cache.conn = m;
        return m;
      })
      .catch((err: unknown) => {
        cache.promise = null;
        cache.conn = null;
        throw err;
      });
  }

  return cache.promise;
}

export async function disconnectDB(): Promise<void> {
  await mongoose.disconnect();
  cache.conn = null;
  cache.promise = null;
}

const READY_STATES: Record<number, string> = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
};

export function dbState(): string {
  return READY_STATES[mongoose.connection.readyState] ?? 'uninitialized';
}
