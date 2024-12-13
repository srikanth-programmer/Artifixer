import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

/**
 *  In Next JS we need to create a connection to the database and export it to be used in the application
 *  And it is making connection every time for every api call and it will terminate right after the call.
 *  This is because of serverless nature of next js.
 */

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

/**
 * Cache the connection to avoid multiple connections
 */

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export const ConnectToDataBase = async () => {
  if (cached.conn) {
    return cached.conn;
  }
  if (!MONGODB_URL) throw new Error("MONGODB_URL not found");

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URL, {
        dbName: "Artifixer",
        bufferCommands: false,
      })
      .then((mongoose) => {
        return mongoose;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};
