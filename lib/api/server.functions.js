import express from "express";
import mongodb from "mongodb";
import http from "http";
import bodyParser from "body-parser";
import path from "path";
import { collections } from "./enums";
import { createToken } from "./auth.functions";
import User from "./User";
import Setup from "./Setup";

export const loginResponse = (req, res) => {
  const user = new User(808);
  const token = createToken(user);
  res.json({
    token
  });
};

export const handleError = (res, reason, message, code) => {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({ error: message });
};

export const createSetupsResponse = database => (req, res) => {
  database
    .collection(collections.SETUPS)
    .find({})
    .toArray((err, docs) => {
      if (err) {
        handleError(res, err.message, "Failed to get setups.");
      } else {
        res.status(200).json(docs);
      }
    });
};

export const createAddSetupResponse = database => (req, res) => {
  const { mode, key, amount } = req.body;
  const newSetup = new Setup(null, mode, key, amount);
  delete newSetup._id;

  if (!mode || !key || !amount) {
    handleError(res, "Invalid user input", "Must provide values.", 400);
  }

  database.collection(collections.SETUPS).insertOne(newSetup, (err, doc) => {
    if (err) {
      handleError(res, err.message, "Failed to create new setup.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
};

export const deleteCallback = res => (err, doc) => {
  if (err) {
    handleError(res, err.message, "Failed to delete a setup.");
  } else {
    res.status(200).json({});
  }
};

export const createDeleteSetupResponse = database => (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new Error("No valid id given.");
  }
  database
    .collection(collections.SETUPS)
    .deleteOne({ _id: new mongodb.ObjectID(id) }, deleteCallback(res));
};

export const createClearSetupsResponse = database => (req, res) => {
  database.collection(collections.SETUPS).deleteMany({}, deleteCallback(res));
};

export const createLoginResponse = () => loginResponse;

export const connected = (err, database) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // const database = client.db("modes");
  const PORT = process.env.PORT || 5000;
  const server = express();
  http.Server(server);

  const webroot = path.join(__dirname, "../dist");
  server.use(express.static(webroot));
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  const setups = createSetupsResponse(database);
  server.get("/api/setups", setups);

  const addSetup = createAddSetupResponse(database);
  server.post("/api/setups", addSetup);

  const deleteSetup = createDeleteSetupResponse(database);
  server.delete("/api/setups/:id", deleteSetup);

  const clearSetups = createClearSetupsResponse(database);
  server.delete("/api/setups", clearSetups);

  server.post("/api/login", loginResponse);

  server.listen(PORT, () => console.log(`Listening on ${PORT}`));
};
