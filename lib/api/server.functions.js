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
  loadSetups,
  saveSetup,
  deleteSetupFactory,
  clearSetupsFactory
} from "./db.functions";

export const listSetupsFactory = database => async (request, response) => {
  try {
    const setups = await loadSetups(database);
    response.status(200).json(setups);
  } catch (e) {
    response.status(500).json({ error: e.message });
  }
};

export const getSetupFromRequest = body => {
  const { mode, key, amount } = body;
  if (!mode || !key || !amount) {
    throw new Error("No Setup in request");
  }
  const setup = new Setup(null, mode, key, amount);
  delete setup._id;
  return setup;
};

export const addSetupFactory = database => async (request, response) => {
  try {
    const newSetup = getSetupFromRequest(request.body);
    const setup = await saveSetup(database, newSetup);
    response.status(200).json(setup);
  } catch (e) {
    response.status(400).json({ error: e.message });
  }
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

export const getServer = database => {
  const server = express();
  http.Server(server);

  const webroot = path.join(__dirname, "../dist");
  server.use(express.static(webroot));
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  const listSetups = listSetupsFactory(database);
  server.get("/api/setups", listSetups);

  const addSetup = addSetupFactory(database);
  server.post("/api/setups", addSetup);

  const deleteSetup = deleteSetupFactory(database);
  const deleteSetupResponse = createDeleteSetupResponse(deleteSetup);
  server.delete("/api/setups/:id", deleteSetupResponse);

  const clearSetups = clearSetupsFactory(database);
  const clearSetupsResponse = createClearSetupsResponse(clearSetups);
  server.delete("/api/setups", clearSetupsResponse);

  server.post("/api/login", loginResponse);

  return server;
};

export const startServer = (database, PORT) => {
  const server = getServer(database);
  server.listen(PORT, () => console.log(`Listening on ${PORT}`));
};
