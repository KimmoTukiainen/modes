import {} from "dotenv/config";
import { connected } from "./server.functions";
import { connect } from "./db.functions";

connect(connected);
