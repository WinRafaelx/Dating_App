import jwt from "jsonwebtoken";

const generateToken = (user) => {
  const token = jwt.sign({ _id: user._id, username: user.username }, 'secret');
  return token;
};

const jwtValidate = (req, res, next) => {
  try {
    // Retrieve the token from the cookie
    const token = req.cookies.token_auth;

    // Check if token exists
    if (!token) {
      console.log("Token not found");
      return res.sendStatus(401);
    }

    // Verify the token
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        console.error("Token verification error:", err.message);
        return res.sendStatus(403);
      }
      console.log("Token verification successful");
      next();
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

export { generateToken, jwtValidate, setTokenCookie };
