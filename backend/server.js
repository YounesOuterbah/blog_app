const express = require("express");
const connectDB = require("./config/db");
const app = express();
require("dotenv").config();
require("colors");

// connect to database
connectDB();

app.use(express.json());

app.use("/api/auth", require("./routes/authRouter"));
app.use("/api/user", require("./routes/userRouter"));
app.use("/api/post", require("./routes/postRouter"));
app.use("/api/comment", require("./routes/commentRouter"));

// app post listening
const PORT = process.env.PORT || 8000;
app.listen(PORT, (req, res) => {
  console.log(`listening on port ${PORT}`);
});
