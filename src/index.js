const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const taskRoute = require("./routes/taskRoute");
const authRoute = require("./routes/authRoute");
const authMiddleware = require("../src/middlewares/authMiddleware");
const methodValidationMiddleware = require("../src/middlewares/methodValidationMiddleware");
const app = express();
const port = process.env.PORT || 9000;
const connectToDatabase = require("./db/db");

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json(), methodValidationMiddleware);
app.use(cookieParser());
app.use("/api/auth", authMiddleware, taskRoute);
app.use("/api", authRoute);

// Routes
app.get("/", (_req, res) => {
  res.send("Welcome to my API");
});

connectToDatabase();

app.listen(port, () => {
  console.log("Server listening on port", port);
});
