const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 5000;
const server = express();

server
  .use(express.static(path.join(__dirname, "dist")))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
