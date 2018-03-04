import mongodb from "mongodb";

// Connect to the database before starting the application server.
export const connect = callback => {
  mongodb.MongoClient.connect(process.env.MONGODB_URI, callback);
};
