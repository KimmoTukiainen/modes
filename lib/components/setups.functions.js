import axios from "axios";
import Setup from "../api/Setup";

import { getTokenHeader } from "./login.functions";

export const parseSetupDataItem = item => {
  const { _id, mode, key, amount } = item;
  return new Setup(_id, mode, key, amount);
};

export const parseSetupData = response => {
  const data = response.data || [];
  return data.map(item => parseSetupDataItem(item));
};

export const getSetups = () =>
  axios
    .get("/api/setups")
    .then(parseSetupData)
    .catch(() => []);

export const deleteSetup = (setup, token) => {
  if (!setup._id) {
    throw new Error("No id provided");
  }

  if (!token) {
    throw new Error("No token given.");
  }

  const { _id } = setup;

  return axios
    .delete(`/api/setups/${_id}`, getTokenHeader(token))
    .then(response => true)
    .catch(error => false);
};

export const clearSetups = token => {
  if (!token) {
    throw new Error("No token given.");
  }
  return axios
    .delete("/api/setups", getTokenHeader(token))
    .then(response => true)
    .catch(error => false);
};

export const createSetup = (setup, token) => {
  if (!setup || !token) {
    return new Promise((reject, resolve) => reject(null));
  }

  return axios
    .post("/api/setups/", setup, getTokenHeader(token))
    .then(response => parseSetupDataItem(response.data))
    .catch(error => null);
};

export const setupLabel = setup => `${setup.mode} ${setup.key} ${setup.amount}`;
