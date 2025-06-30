// lib/mongodb.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI no está definida en .env.local');
}

// Previene múltiples conexiones en desarrollo (Next.js reinicia mucho)
type MongooseCache = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };

let cached: MongooseCache = (global as { mongoose?: MongooseCache }).mongoose as MongooseCache;

if (!cached) {
  cached = (global as { mongoose?: MongooseCache }).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
