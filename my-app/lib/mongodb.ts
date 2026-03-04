import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in .env.local"
  );
}

// Narrowed to `string` after the guard above; stored so the type is preserved
// inside function closures where TypeScript cannot re-apply the top-level check.
const uri: string = MONGODB_URI;

/**
 * Stores both the resolved Mongoose instance and the in-progress
 * connection promise so they can be reused across requests.
 */
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

/**
 * Extend the Node.js global type to hold the mongoose cache.
 * Without this, TypeScript will error on `globalThis.mongoose`.
 */
declare global {
  // var is required here — let/const are not allowed in global augmentations.
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

/**
 * In development, Next.js clears the module cache on every hot reload,
 * which would otherwise open a new connection on every request. Persisting
 * the cache on `globalThis` survives those reloads and keeps a single connection.
 */
const cached: MongooseCache = globalThis.mongoose ?? { conn: null, promise: null };
globalThis.mongoose = cached;

/**
 * Returns a Mongoose connection, reusing any existing connection or
 * in-flight promise to avoid opening redundant connections.
 */
export async function connectToDatabase(): Promise<Mongoose> {
  // Reuse an already-established connection.
  if (cached.conn) {
    return cached.conn;
  }

  // Start a new connection only if one isn't already in progress.
  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      // Disable command buffering so operations fail fast when disconnected
      // rather than silently queuing until a connection is eventually made.
      bufferCommands: false,
    });
  }

  // Wait for the connection to be established and cache the result.
  cached.conn = await cached.promise;

  return cached.conn;
}
