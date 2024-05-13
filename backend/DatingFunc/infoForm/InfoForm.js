import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import { connectDb } from "../../db/db.js";

cloudinary.config({
  cloud_name: "dhudcf11t",
  api_key: "524947196344864",
  api_secret: "tebm4Umkq5tx0BHiSPyVn52g1rY",
});

const infoForm = async (req, res) => {
  const profile_picture = req.file;
  const {
    firstname,
    lastname,
    gender,
    birthdate,
    Sub_District,
    District,
    City,
    Country,
    Postcode,
    bio,
  } = req.body;
  const token = req.cookies.token_auth;
  const decodedToken = jwt.decode(token);

  // Function to connect to MySQL
  const connection = await connectDb();

  try {
    // Check if user already exists
    const query = `
            SELECT * FROM userInfo WHERE (firstname = ? AND lastname = ?) OR user_info_id = ?;
        `;

    // Save user information to the database
    connection.query(
      query,
      [firstname, lastname, decodedToken._id],
      async (err, result) => {
        if (err) {
          console.error(
            "Error checking for existing user:",
            err.sqlMessage || err.message
          );
          connection.end();
          return res.status(500).send("Internal Server Error");
        }

        if (result.length > 0) {
          // Clean up the uploaded image
          fs.unlinkSync(profile_picture.path);
          connection.end();
          return res.status(409).send("User already exists");
        }

        // Upload image to Cloudinary (if needed) and get image URL
        cloudinary.uploader.upload(
          profile_picture.path,
          {
            public_id: profile_picture.originalname,
          },
          (err, result) => {
            if (err) {
              // Clean up the uploaded image
              fs.unlinkSync(profile_picture.path);
              return res.status(500).send("Error uploading image");
            } else {
              const imageURL = result.secure_url;

              // Save user information to the database
              const insertQuery = `
                    INSERT INTO userInfo (user_info_id, firstname, lastname, profile_picture, gender, birthdate, Sub_District, District, City, Country, Postcode, bio) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
                `;

              connection.query(
                insertQuery,
                [
                  decodedToken._id,
                  firstname,
                  lastname,
                  imageURL,
                  gender,
                  birthdate,
                  Sub_District,
                  District,
                  City,
                  Country,
                  Postcode,
                  bio,
                ],
                (err) => {
                  if (err) {
                    console.error(
                      "Error inserting new user information:",
                      err.sqlMessage || err.message
                    );
                    connection.end();
                    return res.status(500).send("Internal Server Error");
                  }
                }
              );
              // Clean up the uploaded image
              fs.unlinkSync(profile_picture.path);

              connection.end();
              return res
                .status(201)
                .send("Completed fill personal information");
            }
          }
        );
      }
    );
  } catch (error) {
    // Clean up the uploaded image
    fs.unlinkSync(profile_picture.path);
    console.error(error);
    connection.end();
    return res.status(500).send("Internal Server Error");
  }
};

// const changeProfile = async (req, res) => {
//   const profile_picture = req.file;
//   const token = req.cookies.token_auth;
//   const decodedToken = jwt.decode(token);
// };

const updateUserInfo = async (req, res) => {
  const {
    firstname,
    lastname,
    gender,
    birthdate,
    Sub_District,
    District,
    City,
    Country,
    Postcode,
    bio,
  } = req.body;
  const token = req.cookies.token_auth;
  const decodedToken = jwt.decode(token);

  // Function to connect to MySQL
  const connection = await connectDb();

  try {
    // Check if user already exists
    const query = `
            SELECT * FROM userInfo WHERE user_info_id = ?;
        `;

    // Save user information to the database
    connection.query(query, [decodedToken._id], async (err, result) => {
      if (err) {
        console.error(
          "Error checking for existing user:",
          err.sqlMessage || err.message
        );
        connection.end();
        return res.status(500).send("Internal Server Error");
      }

      if (result.length === 0) {
        connection.end();
        return res.status(404).send("User not found");
      }

      // Save user information to the database
      const updateQuery = `
            UPDATE userInfo
            SET firstname = ?, lastname = ?, gender = ?, birthdate = ?, Sub_District = ?, District = ?, City = ?, Country = ?, Postcode = ?, bio = ?
            WHERE user_info_id = ?;
        `;
      connection.query(updateQuery, [firstname, lastname, gender, birthdate, Sub_District, District, City, Country, Postcode, bio, decodedToken._id], (err) => {
        if (err) {
          console.error(
            "Error updating user information:",
            err.sqlMessage || err.message
          );
          connection.end();
          return res.status(500).send("Internal Server Error");
        }
        connection.end();
        return res.status(200).send("User information updated");
      });
    });
  } catch (error) {
    console.error(error);
    connection.end();
    return res.status(500).send("Internal Server Error");
  }
};

export { infoForm, updateUserInfo };
