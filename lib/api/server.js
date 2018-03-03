import express from "express";
import bodyParser from "body-parser";
import mongodb from "mongodb";
import path from "path";
import { collections } from "./enums";

const PORT = process.env.PORT || 5000;
const server = express();

server
  .use(express.static(path.join(__dirname, "dist")))
  .use(bodyParser.json())
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

server.get("/api/setups", (req, res) => {
  res.status(200).json({
    aa: "astastast"
  });
  /* db
      .collection(CONTACTS_COLLECTION)
      .find({})
      .toArray(function(err, docs) {
        if (err) {
          handleError(res, err.message, "Failed to get contacts.");
        } else {
          res.status(200).json(docs);
        }
      });*/
});
