import { connectDb } from "../../db/db.js";
import jwt from "jsonwebtoken";

const reportForm = async (req, res) => {
  const { reported_user_id, report_type, report_description } = req.body;
  const token = req.cookies.token_auth;
  const decodedToken = jwt.decode(token);

  const connection = await connectDb();

  if (reported_user_id == decodedToken._id) {
    return res.status(400).send("You cannot report yourself");
  }

  try {
    connection.query(
      "SELECT * FROM reports WHERE Reporter_ID = ? AND Reported_ID = ?",
      [decodedToken._id, reported_user_id],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
        }
        if (result.length > 0) {
          return res.status(400).send("You have already reported this user");
        }
        connection.query(
          "INSERT INTO reports (Reporter_ID, Reported_ID, Report_Type, Report_Description) VALUES (?, ?, ?, ?)",
          [decodedToken._id, reported_user_id, report_type, report_description],
          (err) => {
            if (err) {
              console.error(err);
              res.status(500).send("Internal Server Error");
            }
            res.status(201).send("User reported");
          }
        );
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export { reportForm };
