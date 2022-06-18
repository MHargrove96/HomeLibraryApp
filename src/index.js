const express = require("express");
const app = express();

const port = process.env.PORT || 4001;

require("dotenv").config();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    "Welcome to the server, This is will soon be a book cataloging app!"
  );
});

app.listen(port, () => {
  console.log(`Web server listening on Port ${port}!`);
});
