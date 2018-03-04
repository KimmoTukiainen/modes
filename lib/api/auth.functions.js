import jwt from "jsonwebtoken";
import User from "./User";

export const authMiddleware = () => {};

export const createToken = user => {
  if (!user instanceof User) {
    throw new Error("Incorrect user given.");
  }
  const token = jwt.sign({ user }, process.env.SECRET);
  return token;
};
