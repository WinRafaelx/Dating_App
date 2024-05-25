import { connectDb } from "../../db/db.js";
import jwt from "jsonwebtoken";

const blockForm = async (req, res) => {
  const { blocked_user_id } = req.body;
  const token = req.cookies.token_auth;
  const decodedToken = jwt.decode(token);

  const connection = await connectDb();

  if (blocked_user_id == decodedToken._id) {
    return res.status(400).send("You cannot block yourself");
  }

  try {
    connection.query(
      "SELECT * FROM blocks WHERE (Blocker_ID = ? AND Blocked_ID = ?) or (Blocker_ID = ? AND Blocked_ID = ?)",
      [decodedToken._id, blocked_user_id, blocked_user_id, decodedToken._id],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
        }
        if (result.length > 0) {
          return res
            .status(400)
            .send("You have already blocked this user Or User has blocked you");
        }
        connection.query(
          "INSERT INTO blocks (Blocker_ID, Blocked_ID) VALUES (?, ?)",
          [decodedToken._id, blocked_user_id],
          (err) => {
            if (err) {
              console.error(err);
              res.status(500).send("Internal Server Error");
            }
          }
        );
        connection.query(
          "UPDATE chats set Chat_Status = 'Inactive' WHERE (User1_ID = ? AND User2_ID = ?) OR (User1_ID = ? AND User2_ID = ?)",
          [
            decodedToken._id,
            blocked_user_id,
            blocked_user_id,
            decodedToken._id,
          ],
          (err) => {
            if (err) {
              console.error(err);
              res.status(500).send("Internal Server Error");
            }
          }
        );
        res.status(201).send("User blocked");
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export { blockForm };
