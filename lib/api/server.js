import {} from "dotenv/config";
import { createEndpoints } from "./server.functions";
import { connect } from "./db.functions";

connect(createEndpoints);
