import express from "express";
import bcrypt from "bcrypt";
import { registerModel, registerSchema } from "./model.js";

const router = express.Router();

router.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      const newUser = new registerModel({
        username: username,
        email: email,
        password: hash,
      });
      await newUser.save();
      res.status(201).send("User created");
    }
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await registerModel.findOne({ username: username });
  if (user) {
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        res.status(200).send("Login successful");
      } else {
        res.status(401).send("Unauthorized");
      }
    });
  } else {
    res.status(401).send("Unauthorized");
  }
});

export default router;
