import express from "express";
import { connectDb } from "./db/db.js";
import authenRouter from "./Authentication/route.js";
import { jwtValidate } from "./Authentication/token/token.js";
import DatingRouter from "./DatingFunc/route.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import jwt from "jsonwebtoken";

connectDb()

// Create an instance of Express
const app = express();

// Middleware
app.use(express.json())
app.use(cors());
app.use(cookieParser());
app.use("/app", jwtValidate);

// Define a route
app.get("/app", async (req, res) => {
  const token = req.cookies.token_auth;
  const decodedToken = jwt.decode(token);
  res.json(decodedToken);
});


app.use("/auth", authenRouter);
app.use("/app", DatingRouter);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
