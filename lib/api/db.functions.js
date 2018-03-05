import mongodb from "mongodb";

// Connect to the database before starting the application server.
export const connect = callback => {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri.length === 0) {
    throw new Error("Mongo DB uri is not defined in process.env");
  }
  mongodb.MongoClient.connect(uri, callback);
};
