import mongodb from "mongodb";
import { collections } from "./enums";

// Connect to the database before starting the application server.
export const connect = callback => {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri.length === 0) {
    throw new Error("Mongo DB uri is not defined in process.env");
  }
  mongodb.MongoClient.connect(uri, callback);
};

export const loadSetupsFactory = database => callback =>
  database
    .collection(collections.SETUPS)
    .find({})
    .toArray(callback);

export const saveSetupFactory = database => (newSetup, callback) =>
  database.collection(collections.SETUPS).insertOne(newSetup, callback);

export const deleteSetupFactory = database => (id, callback) =>
  database
    .collection(collections.SETUPS)
    .deleteOne({ _id: new mongodb.ObjectID(id) }, callback);

export const clearSetupsFactory = database => callback =>
  database.collection(collections.SETUPS).deleteMany({}, callback);
