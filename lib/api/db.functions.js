import mongodb from "mongodb";
import { collections } from "./enums";

// Connect to the database before starting the application server.
export const connect = uri => {
  if (!uri || uri.length === 0) {
    throw new Error("Mongo DB uri is not defined in process.env");
  }
  return new Promise((resolve, reject) => {
    mongodb.MongoClient.connect(uri, (error, database) => {
      const output = {
        error,
        database
      };
      resolve(output);
    });
  });
};

export const loadSetups = database => {
  return new Promise((resolve, reject) => {
    database
      .collection(collections.SETUPS)
      .find({})
      .toArray((err, docs) => {
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }
      });
  });
};

export const saveSetup = (database, setup) => {
  return new Promise((resolve, reject) => {
    database.collection(collections.SETUPS).insertOne(setup, (error, docs) => {
      if (error) {
        reject(error);
      } else {
        resolve(docs.ops[0]);
      }
    });
  });
};

export const deleteSetup = (database, id) => {
  return new Promise((resolve, reject) => {
    database
      .collection(collections.SETUPS)
      .deleteOne({ _id: new mongodb.ObjectID(id) }, (error, docs) => {
        if (error) {
          reject(error);
        } else {
          resolve(true);
        }
      });
  });
};

export const clearSetups = database => {
  return new Promise((resolve, reject) => {
    database.collection(collections.SETUPS).deleteMany({}, (error, docs) => {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
};
