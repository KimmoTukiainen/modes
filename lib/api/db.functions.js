import mongodb from "mongodb";

// Connect to the database before starting the application server.
export const connect = callback => {
  const uri = process.env.MONGODB_URI;
  mongodb.MongoClient.connect(uri, callback);
};
