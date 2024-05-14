import { connectDb } from "../../db/db.js";
import jwt from "jsonwebtoken";

// Calculate the age function from birthdate
const calculateAge = (birthdate) => {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const matching = async (req, res) => {
  const { addressType } = req.body;
  const token = req.cookies.token_auth;
  const decodedToken = jwt.decode(token);
  const connection = await connectDb();

  try {
    // Check user's preferences
    connection.query(
      "SELECT * FROM preferences WHERE user_pref_id = ?",
      [decodedToken._id],
      (err, preference) => {
        if (err) {
          console.error(
            "Error checking for user preferences:",
            err.sqlMessage || err.message
          );
          return res.status(500).send("Internal Server Error");
        }
        if (preference.length === 0) {
          console.log("User preferences not found");
          return res.status(404).send("User preferences not found");
        }

        connection.query(
          "SELECT * FROM userInfo WHERE user_info_id = ?",
          [decodedToken._id],
          (err, userInfo) => {
            if (err) {
              console.error(
                "Error checking for user information:",
                err.sqlMessage || err.message
              );
              return res.status(500).send("Internal Server Error");
            }
            if (userInfo.length === 0) {
              console.log("User information not found");
              return res.status(404).send("User information not found");
            }

            // Define the query criteria based on the addressType
            let query = `SELECT * FROM userInfo WHERE user_info_id != ? AND gender = ?`;
            let queryParams = [decodedToken._id, preference[0].preferred_gender];
            if (addressType.toLowerCase() === "sub_district") {
              query += ` AND City = ? AND District = ? AND Sub_District = ?`;
              queryParams.push(
                userInfo[0].City,
                userInfo[0].District,
                userInfo[0].Sub_District
              );
            } else if (addressType != "") {
              query += ` AND City = ?`;
              queryParams.push(userInfo[0].City);
            }

            // Check already liked users
            let likedQuery = `SELECT Liked_ID FROM likes WHERE Liker_ID = ?`;
            connection.query(likedQuery, [decodedToken._id], (err, likedUsers) => {
              if (err) {
                console.error(
                  "Error checking for liked users:",
                  err.sqlMessage || err.message
                );
                return res.status(500).send("Internal Server Error");
              }

              // Filter out already liked users
              const likedUserIds = likedUsers.map((user) => user.Liked_ID);
              query += ` AND user_info_id NOT IN (?)`;
              queryParams.push(likedUserIds);

              // Find all users except the current user based on the query criteria
              connection.query(query, queryParams, (err, allUsers) => {
                if (err) {
                  console.error(
                    "Error retrieving all users based on criteria:",
                    err.sqlMessage || err.message
                  );
                  return res.status(500).send("Internal Server Error");
                }

                // Filter users based on preferences
                const userInPreference = allUsers.filter((user) => {
                  const userAge = calculateAge(user.birthdate);
                  return (
                    userAge >= preference[0].preferred_age_min &&
                    userAge <= preference[0].preferred_age_max &&
                    user[addressType] == userInfo[0][addressType]
                  );
                });

                // Return the filtered users
                connection.end()
                res.status(200).json(userInPreference);
              });
            });
          }
        );
      }
    );

  } catch (err) {
    console.error(err);
    connection.end();
    res.status(500).send("Internal Server Error");
  }
};

export { matching };
