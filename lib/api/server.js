import {} from "dotenv/config";
import { startServer } from "./server.functions";
import { connect } from "./db.functions";
import Auth from "./Auth";
/**
 * start will create a new server instance and run it.
 */
const start = async () => {
  const PORT = process.env.PORT || 5000;
  const { MONGODB_URI } = process.env;
  const { SECRET } = process.env;

  const connection = await connect(MONGODB_URI);
  if (connection.error) {
    throw new Error("Could not connect to the database.");
  }
  const { database } = connection;

  const auth = new Auth(SECRET);

  startServer(database, auth, PORT);
};

start();
