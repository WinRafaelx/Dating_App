import express from "express";
import { mongoose } from "mongoose";
import { connectDb, userModel } from "./db/db.js";
import authenRouter from "./Authentication/util.js";

connectDb()

// Create an instance of Express
const app = express();

// Middleware
app.use(express.json())

// Define a route
app.get("/", async (req, res) => {
  const users = await userModel.find();
  res.send(users);
});

app.use("/auth", authenRouter);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
