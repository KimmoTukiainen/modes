import {} from "dotenv/config";
import { startServer } from "./server.functions";
import { connect } from "./db.functions";

const start = async () => {
  const uri = process.env.MONGODB_URI;
  const connection = await connect(uri);
  if (connection.error) {
    throw new Error("Could not connect to the database.");
  }
  const { database } = connection;
  const PORT = process.env.PORT || 5000;
  startServer(database, PORT);
};

start();
