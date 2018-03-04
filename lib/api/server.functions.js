import express from "express";
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

export const createSetupsResponse = (database, client) => (req, res) => {
  database
    .collection(collections.SETUPS)
    .find({})
    .toArray((err, docs) => {
      if (err) {
        handleError(res, err.message, "Failed to get setups.");
      } else {
        res.status(200).json(docs);
        client.close();
      }
    });
};

export const addSetup = (req, res) => {
  const { mode, key, amount } = req.body;
  const newSetup = new Setup(mode, key, amount);
  db.collection(collections.SETUPS).insertOne(newSetup, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new setup.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
};

export const createLoginResponse = () => loginResponse;

export const connected = (err, client) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  const database = client.db("modes");
  const PORT = process.env.PORT || 5000;
  const server = express();
  const setups = createSetupsResponse(database, client);
  server.get("/api/setups", setups);
  server.post("/api/setups", setups);
  server.post("/api/login", loginResponse);

  server
    .use(express.static(path.join(__dirname, "../../dist")))
    .use(bodyParser.json())
    .listen(PORT, () => console.log(`Listening on ${PORT}`));
};
