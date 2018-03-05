import express from "express";
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

export const createAddSetupResponse = (database, client) => (req, res) => {
  const { mode, key, amount } = req.body;
  const newSetup = new Setup(mode, key, amount);
  database
    .collection(collections.SETUPS)
    .insertOne(newSetup, function(err, doc) {
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
  http.Server(server);
  const setups = createSetupsResponse(database, client);
  const addSetup = createAddSetupResponse(database, client);
  const webroot = path.join(__dirname, "../dist");
  server.use(express.static(webroot));
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  server.get("/api/setups", setups);
  server.post("/api/setups", addSetup);
  server.post("/api/login", loginResponse);

  server.listen(PORT, () => console.log(`Listening on ${PORT}`));
};
