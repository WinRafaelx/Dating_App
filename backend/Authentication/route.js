import express from "express";
import bcrypt from "bcrypt";
import { connectDb } from "../db/db.js";
import { generateToken, setTokenCookie } from "./token/token.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Function to connect to MySQL
  const connection = await connectDb();

  try {
    // Check if username or email already exists
    const selectQuery = `SELECT * FROM userAuth WHERE username = ? OR email = ?`;
    connection.query(selectQuery, [username, email], async (err, result) => {
      if (err) {
        console.error(
          "Error checking for existing user:",
          err.sqlMessage || err.message
        );
        return res.status(500).send("Internal Server Error");
      }
      if (result.length > 0) {
        return res.status(409).send("User already exists");
      }

      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Insert new user into the database
      const insertQuery = `INSERT INTO userAuth (username, email, password) VALUES (?, ?, ?)`;
      connection.query(
        insertQuery,
        [username, email, hashedPassword],
        (err) => {
          if (err) {
            console.error(
              "Error inserting new user:",
              err.sqlMessage || err.message
            );
            return res.status(500).send("Internal Server Error");
          }
          connection.end();
          return res.status(201).send("User created");
        }
      );
    });
  } catch (error) {
    console.error("Error registering user:", error.sqlMessage || error.message);
    return res.status(500).send("Internal Server Error");
  }
});

router.post("/login", async (req, res) => {
  // Function to connect to MySQL
  const connection = await connectDb();
  const { username_email, password } = req.body;

  try {
    // Check if user exists with username or email
    const query = `SELECT * FROM userAuth WHERE username = ? OR email = ?`;
    connection.query(query, [username_email, username_email], (err, result) => {
      if (err) {
        console.error(
          "Error checking for existing user:",
          err.sqlMessage || err.message
        );
        return res.status(500).send("Internal Server Error");
      }
      if (result.length === 0) {
        return res.status(401).send("User not found");
      }

      // Compare passwords
      const user = result[0];
      bcrypt.compare(password, user.password, (err, isPasswordValid) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          return res.status(500).send("Internal Server Error");
        }
        if (!isPasswordValid) {
          return res.status(401).send("Invalid password");
        }

        // Generate token and set cookie
        const token = generateToken(user);
        setTokenCookie(res, token);

        // Close the connection after completing the query
        connection.end();

        // Send token in response
        return res.json({ token });
      });
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// Logout route (assuming you're using Express)
router.post("/logout", (req, res) => {
  // Clear the token_auth cookie
  res.clearCookie("token_auth");
  // Optionally, you can redirect the user to another page after logout
  res.send("Already logged out");
});

export default router;
