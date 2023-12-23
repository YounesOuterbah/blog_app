const express = require("express");
const connectDB = require("./config/db");
const app = express();
require("dotenv").config();
require("colors");

connectDB();

app.get("/", (req, res) => {
  res.send("Hello");
});

// app post listening
const PORT = process.env.PORT || 8000;
app.listen(PORT, (req, res) => {
  console.log(`listening on port ${PORT}`);
});
