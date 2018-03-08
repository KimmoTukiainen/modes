import express from "express";
import mongodb from "mongodb";
import http from "http";
import bodyParser from "body-parser";
import path from "path";
import { collections } from "./enums";
import { createToken } from "./auth.functions";
import User from "./User";
import Setup from "./Setup";
import {
  loadSetupsFactory,
  saveSetupFactory,
  deleteSetupFactory,
  clearSetupsFactory
} from "./db.functions";

export const handleError = (res, error, reason, code = 500) => {
  res.status(code).json({ error: error.message, reason });
};

export const failure = (res, reason, code) => error =>
  handleError(res, error, reason, code);

export const endpointCallbackFactory = (success, failure) => (err, data) => {
  if (err) {
    failure(err);
  }
  success(data);
};

export const listSetupsOutputFactory = res => setups =>
  res.status(200).json(setups);

export const listSetupsResponseFactory = listSetups => (req, res) =>
  listSetups(
    endpointCallbackFactory(
      listSetupsOutputFactory(res),
      failure(res, "Could not load setups")
    )
  );

export const addSetupOutputFactory = res => setup =>
  res.status(201).json(setup.ops[0]);

export const getSetupFromRequest = body => {
  const { mode, key, amount } = body;
  if (!mode || !key || !amount) {
    handleError(res, "Invalid user input", "Must provide values.", 400);
  }
  const setup = new Setup(null, mode, key, amount);
  delete setup._id;
  return setup;
};

export const addSetupResponseFactory = addSetup => (req, res) => {
  const newSetup = getSetupFromRequest(req.body);
  addSetup(
    newSetup,
    endpointCallbackFactory(
      addSetupOutputFactory(res),
      failure(res, "Could not add setup")
    )
  );
};

export const deleteSetupOutputFactory = res => () => res.status(200).json({});

export const createDeleteSetupResponse = deleteSetup => (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new Error("No valid id given.");
  }
  deleteSetup(
    id,
    endpointCallbackFactory(
      deleteSetupOutputFactory(res),
      failure(res, "Could not delete setup")
    )
  );
};

export const createClearSetupsResponse = clearSetups => (req, res) =>
  clearSetups(
    endpointCallbackFactory(
      deleteSetupOutputFactory(res),
      failure(res, "Could not clear setups")
    )
  );

export const createLoginResponse = () => loginResponse;
export const loginResponse = (req, res) => {
  const user = new User(808);
  const token = createToken(user);
  res.json({
    token
  });
};

export const createEndpoints = (err, database) => {
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

  const loadSetups = loadSetupsFactory(database);
  const listSetupsResponse = listSetupsResponseFactory(loadSetups);
  server.get("/api/setups", listSetupsResponse);

  const saveSetup = saveSetupFactory(database);
  const addSetupResponse = addSetupResponseFactory(saveSetup);
  server.post("/api/setups", addSetupResponse);

  const deleteSetup = deleteSetupFactory(database);
  const deleteSetupResponse = createDeleteSetupResponse(deleteSetup);
  server.delete("/api/setups/:id", deleteSetupResponse);

  const clearSetups = clearSetupsFactory(database);
  const clearSetupsResponse = createClearSetupsResponse(clearSetups);
  server.delete("/api/setups", clearSetupsResponse);

  server.post("/api/login", loginResponse);

  server.listen(PORT, () => console.log(`Listening on ${PORT}`));
};
