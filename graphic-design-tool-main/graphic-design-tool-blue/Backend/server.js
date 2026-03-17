const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is working without MySQL!");
});

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/notifications", notificationRoutes);

/* Start server */
app.listen(5050, () => {
  console.log("Server running on port 5050");
});
