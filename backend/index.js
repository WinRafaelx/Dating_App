import express from "express";
import { connectDb } from "./db/db.js";
import authenRouter from "./Authentication/route.js";
import { jwtValidate } from "./Authentication/token/token.js";
import DatingRouter from "./DatingFunc/route.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import http from "http";

connectDb();

// Create an instance of Express
const app = express();
const server = http.createServer(app); // Pass app to createServer
const io = new Server(server);

// Middleware
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(cookieParser());
// app.use("/app", jwtValidate);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

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
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { io };
