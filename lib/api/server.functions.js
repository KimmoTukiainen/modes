import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { collections } from "./enums";
import { createToken } from "./auth.functions";
import User from "./User";

export const loginResponse = (req, res) => {
  const user = new User(808);
  const token = createToken(user);
  res.json({
    token
  });
};

export const createSetupsResponse = database => (req, res) => {
  database
    .collection(collections.SETUPS)
    .find({})
    .toArray(function(err, docs) {
      if (err) {
        handleError(res, err.message, "Failed to get setups.");
      } else {
        res.status(200).json(docs);
      }
    });
};

export const createLoginResponse = () => loginResponse;

export const connected = (err, database) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  const PORT = process.env.PORT;
  const server = express();
  const setups = createSetupsResponse(database);
  server.get("/api/setups", setups);
  server.post("/api/login", loginResponse);

  server
    .use(express.static(path.join(__dirname, "../../dist")))
    .use(bodyParser.json())
    .listen(PORT, () => console.log(`Listening on ${PORT}`));
};
