import User from "./User";
import { compose } from "../functional.functions";
import {
  createTokenFactory,
  getTokenFromRequest,
  getUserFromTokenFactory
} from "./auth.functions";

class Auth {
  constructor(secret) {
    if (!secret) {
      throw new Error("No secret given.");
    }
    this.secret = secret;
  }
  createToken(user) {
    if (!(user instanceof User)) {
      throw new Error("Incorrect user given.");
    }
    const createToken = createTokenFactory(this.secret);
    return createToken(user);
  }

  getMiddleware() {
    const getUserFromToken = getUserFromTokenFactory(this.secret);
    const getUserFromRequest = compose([getTokenFromRequest, getUserFromToken]);

    return (request, response, next) => {
      try {
        const user = getUserFromRequest(request);
        if (!user) {
          response.sendStatus(403);
        } else {
          request.user = user;
          next();
        }
      } catch (e) {
        response.sendStatus(403);
      }
    };
  }
}

export default Auth;
