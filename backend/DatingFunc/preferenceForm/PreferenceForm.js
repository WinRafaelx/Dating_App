import { connectDb } from "../../db/db.js";
import jwt from "jsonwebtoken";

const preferenceForm = async (req, res) => {
  const { preferred_age_min, preferred_age_max, preferred_gender } = req.body;
  const token = req.cookies.token_auth;
  const decodedToken = jwt.decode(token);

  const connection = await connectDb();

  try {
    // Check if preferences already exist for the user
    const selectQuery = `SELECT * FROM preferences WHERE user_pref_id = ?`;
    const existingPreference = await connection.query(
      selectQuery,
      [decodedToken._id],
      (err, result) => {
        if (err) {
          console.error(
            "Error checking for existing preferences:",
            err.sqlMessage || err.message
          );
          connection.end();
          return res.status(500).send("Internal Server Error");
        }
        return result;
      }
    );

    if (existingPreference.length > 0) {
      // If preferences exist, update them
      const updateQuery = `
                UPDATE preferences 
                SET preferred_age_min = ?, preferred_age_max = ?, preferred_gender = ?
                WHERE user_pref_id = ?
            `;
      await connection.query(
        updateQuery,
        [
          preferred_age_min,
          preferred_age_max,
          preferred_gender,
          decodedToken._id,
        ],
        (err) => {
          if (err) {
            console.error(
              "Error updating preferences:",
              err.sqlMessage || err.message
            );
            connection.end();
            return res.status(500).send("Internal Server Error");
          }
          connection.end();
          return res.status(200).send("Preferences updated");
        }
      );
    } else {
      // If preferences do not exist, create new preferences
      const insertQuery = `
                INSERT INTO preferences (user_pref_id, preferred_age_min, preferred_age_max, preferred_gender) 
                VALUES (?, ?, ?, ?)
            `;
      await connection.query(
        insertQuery,
        [
          decodedToken._id,
          preferred_age_min,
          preferred_age_max,
          preferred_gender,
        ],
        (err) => {
          if (err) {
            console.error(
              "Error creating preferences:",
              err.sqlMessage || err.message
            );
            connection.end();
            return res.status(500).send("Internal Server Error");
          }
          connection.end();
          res.status(201).send("Preferences created");
        }
      );
    }
  } catch (err) {
    console.error("Error processing preferences:", err);
    connection.end();
    res.status(500).send("Internal Server Error");
  }
};

export { preferenceForm };
