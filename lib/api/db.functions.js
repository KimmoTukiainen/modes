import mongodb from "mongodb";

export const connect = callback =>
  // Connect to the database before starting the application server.
  mongodb.MongoClient.connect(process.env.MONGODB_URI, callback);
