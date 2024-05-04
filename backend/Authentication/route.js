import express from "express";
import bcrypt from "bcrypt";
import { registerModel } from "./model.js";
import { generateToken, setTokenCookie } from "./token/token.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const users = await registerModel.find({
    $or: [
      { username: username },
      { email: email }
    ]
  });

  if (users.length > 0) {
    res.status(409).send("Username or Email already exists");
    return;
  }
  
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
  const { username_email, password } = req.body;
  const user = await registerModel.findOne({ $or: [
    { username: username_email },
    { email: username_email }
  ] });
  if (user) {
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = generateToken(user);
        setTokenCookie(res, token);
        res.json({ token });
        // res.status(200).send("Login successful");
      } else {
        res.status(401).send("Unauthorized");
      }
    });
  } else {
    res.status(401).send("Unauthorized");
  }
});

export default router;
