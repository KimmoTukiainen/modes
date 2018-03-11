import express from "express";
import mongodb from "mongodb";
import http from "http";
import bodyParser from "body-parser";
import path from "path";
import { collections } from "./enums";
import User from "./User";
import Setup from "./Setup";
import {
  loadSetups,
  saveSetup,
  deleteSetup,
  clearSetups
} from "./db.functions";
import md5 from "md5";

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

export const deleteSetupFactory = database => async (request, response) => {
  const id = request.params ? request.params.id : null;
  if (!id) {
    response.status(400).json({ error: "No valid id given" });
  } else {
    try {
      await deleteSetup(database, id);
      response.sendStatus(204);
    } catch (e) {
      response.status(500).json({ error: e.message });
    }
  }
};

export const clearSetupsFactory = database => async (request, response) => {
  try {
    await clearSetups(database);
    response.sendStatus(204);
  } catch (e) {
    response.status(500).json({ error: e.message });
  }
};

const fakeListOfCredentials = [
  {
    id: 1,
    username: "test",
    password: "ae2b1fca515949e5d54fb22b8ed95575" // testing
  },
  {
    id: 808,
    username: "other",
    password: "0e65538bbe148a78f6202240214b1afc" // totallyfake
  }
];

const fakeLoginCheck = (username, password) => {
  return new Promise((resolve, reject) => {
    const userData = fakeListOfCredentials.find(
      u => u.username === username && u.password === md5(password)
    );
    let user = null;
    if (userData) {
      user = new User(userData.id, userData.username);
    }
    resolve(user);
  });
};

export const loginResponseFactory = auth => async (request, response) => {
  const { username, password } = request.body;
  const user = await fakeLoginCheck(username, password);
  if (!user) {
    response.sendStatus(401);
  } else {
    const token = auth.createToken(user);
    response.status(200).json({
      token
    });
  }
};

export const getCurrentUser = (request, response) => {
  const user = request.user;
  response.status(200).json({
    user: user.user
  });
};

export const getServer = (database, auth) => {
  const server = express();
  http.Server(server);

  const webroot = path.join(__dirname, "../dist");
  server.use(express.static(webroot));
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  const verifyToken = auth.getMiddleware();

  const listSetups = listSetupsFactory(database);
  server.get("/api/setups", listSetups);

  const addSetup = addSetupFactory(database);
  server.post("/api/setups", verifyToken, addSetup);

  const deleteSetup = deleteSetupFactory(database);
  server.delete("/api/setups/:id", verifyToken, deleteSetup);

  const clearAll = clearSetupsFactory(database);
  server.delete("/api/setups", verifyToken, clearAll);

  const loginResponse = loginResponseFactory(auth);
  server.post("/api/login", loginResponse);

  server.get("/api/users/me", verifyToken, getCurrentUser);

  return server;
};

export const startServer = (database, auth, PORT) => {
  const server = getServer(database, auth);
  server.listen(PORT, () => console.log(`Listening on ${PORT}`));
};
