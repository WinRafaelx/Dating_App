import express from "express";
import { mongoose } from "mongoose";
import { connectDb, userModel } from "./db/db.js";
import authenRouter from "./Authentication/util.js";
import { jwtValidate } from "./Authentication/token/token.js";
import cookieParser from 'cookie-parser';

connectDb()

// Create an instance of Express
const app = express();

// Middleware
app.use(express.json())
app.use(cookieParser());
app.use("/app", jwtValidate);

// Define a route
app.get("/app", async (req, res) => {
  res.send("Hello");
});

app.use("/auth", authenRouter);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
