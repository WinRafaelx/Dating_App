import jwt from "jsonwebtoken";
import { connectDb } from "../../db/db.js";

const likeForm = async (req, res) => {
  const { liked_user_id } = req.body;
  const token = req.cookies.token_auth;
  const decodedToken = jwt.decode(token);

  const connection = await connectDb();

  if (liked_user_id == decodedToken._id) {
    return res.status(400).send("You cannot like yourself");
  }

  try {
    connection.query(
      "INSERT INTO likes (Liker_ID, Liked_ID) VALUES (?, ?)",
      [decodedToken._id, liked_user_id],
      (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
        }
        connection.query(
          "SELECT * FROM likes WHERE Liker_ID = ? AND Liked_ID = ?",
          [liked_user_id, decodedToken._id],
          (err, checkMatch) => {
            if (err) {
              console.error(err);
              res.status(500).send("Internal Server Error");
            }
            if (checkMatch.length > 0) {
              // If liked exists, create a new match
              connection.query(
                "INSERT INTO matches (Matcher_ID, Matched_ID, Matched_Status) VALUES (?, ?, ?)",
                [decodedToken._id, liked_user_id, "Matched"]
              );

              // Create a new chat
              connection.query(
                "INSERT INTO chats (User1_ID, User2_ID) VALUES (?, ?)",
                [decodedToken._id, liked_user_id]
              );

              res.status(201).send("Match created");
            } else {
              connection.query(
                "INSERT INTO matches (Matcher_ID, Matched_ID, Matched_Status) VALUES (?, ?, ?)",
                [liked_user_id, decodedToken._id, "Pending"]
              );
              res.status(201).send("Like created");
            }
          }
        );
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export { likeForm };
