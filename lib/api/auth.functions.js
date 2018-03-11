import jwt from "jsonwebtoken";
import { compose } from "../functional.functions";

export const getBearerHeader = request => {
  return request.headers["authorization"];
};

// Authorization: Bearer <access_token>
export const getTokenFromHeader = header => {
  if (typeof header !== "string") {
    throw new Error("Incorrect header provided");
  }
  const parts = header.split(" ");
  if (parts.length !== 2) {
    return null;
  }
  return parts[1];
};

export const getTokenFromRequest = compose([
  getBearerHeader,
  getTokenFromHeader
]);

export const createTokenFactory = secret => user => {
  return jwt.sign({ user }, secret);
};

export const getUserFromTokenFactory = secret => token => {
  return jwt.verify(token, secret);
};
