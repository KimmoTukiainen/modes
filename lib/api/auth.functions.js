import jwt from "jsonwebtoken";
import { compose } from "../functional.functions";

export const getBearerHeader = request => request.headers.authorization;

/**
 * @param  {string} header - A http header string in the format Authorization: Bearer <access_token>
 */
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

/**
 * getTokenFromRequest takes an http request and returns the auth token
 * @param  {Request} request - an http request 
 */
export const getTokenFromRequest = compose([
  getBearerHeader,
  getTokenFromHeader
]);

export const createTokenFactory = secret => user => jwt.sign({ user }, secret);
export const getUserFromTokenFactory = secret => token =>
  jwt.verify(token, secret);
