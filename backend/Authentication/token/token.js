import jwt from "jsonwebtoken";
import { connectDb } from "../../db/db.js";

// Function to connect to MySQL
const connection = await connectDb();

const generateToken = (user) => {
  const token = jwt.sign({ _id: user.user_id, username: user.username }, 'secret');
  return token;
};

const userValidate = (req, res, next) => {
  try {
    // Retrieve the token from the cookie
    const token = req.cookies.token_auth;

    // Check if token exists
    if (!token) {
      console.log("Token not found");
      return res.sendStatus(401);
    }

    // Verify the token
    jwt.verify(token, 'secret', async (err, decoded) => {
      if (err) {
        console.error("Token verification error:", err.message);
        return res.sendStatus(403);
      }

      // Retrieve user data from the database
      const query = `SELECT * FROM userAuth WHERE user_id = ? and role = 'user'`;
      await connection.query(query, [decoded._id], (err, result) => {
        if (err) {
          console.error("Error retrieving user data:", err.sqlMessage || err.message);
          return res.sendStatus(500);
        }

        const user = result[0];
        if (!user) {
          console.log("User not found in the database");
          return res.sendStatus(401);
        }

        console.log("Token verification successful");
        req.user = user; // Attach user data to request object
        next();
      });
    });
  } catch (error) {
    console.error("Error in jwtValidate middleware:", error);
    return res.sendStatus(500);
  }
};

const setTokenCookie = (res, token) => {
  const cookieOptions = {
    httpOnly: true, // Cookie accessible only through HTTP(S) requests
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  };

  res.cookie("token_auth", token, cookieOptions); // Use res.cookie to set the token cookie
};

export { generateToken, userValidate, setTokenCookie };
