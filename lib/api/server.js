import {} from "dotenv/config";
import { startServer } from "./server.functions";
import { connect } from "./db.functions";
import Auth from "./Auth";

const start = async () => {
  const URI = process.env.MONGODB_URI;
  const PORT = process.env.PORT || 5000;
  const SECRET = process.env.SECRET;

  const connection = await connect(URI);
  if (connection.error) {
    throw new Error("Could not connect to the database.");
  }
  const { database } = connection;

  const auth = new Auth(SECRET);

  startServer(database, auth, PORT);
};

start();
