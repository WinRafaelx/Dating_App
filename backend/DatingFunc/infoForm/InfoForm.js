import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import { connectDb, queryAsync } from "../../db/db.js";

cloudinary.config({
  cloud_name: 'dhudcf11t',
  api_key: '524947196344864',
  api_secret: 'tebm4Umkq5tx0BHiSPyVn52g1rY',
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

  let connection;

  try {
    connection = connectDb();

    const query = `SELECT * FROM userInfo WHERE (firstname = ? AND lastname = ?) OR user_info_id = ?;`;

    const existingUser = await queryAsync(connection, query, [firstname, lastname, decodedToken._id]);

    if (existingUser.length > 0) {
      if (profile_picture) fs.unlinkSync(profile_picture.path);
      return res.status(409).send('User already exists');
    }

    let imageURL = null;

    if (profile_picture) {
      const uploadResult = await cloudinary.uploader.upload(profile_picture.path, {
        public_id: profile_picture.originalname,
      });
      imageURL = uploadResult.secure_url;
    }

    const insertQuery = `
      INSERT INTO userInfo (user_info_id, firstname, lastname, profile_picture, gender, birthdate, Sub_District, District, City, Country, Postcode, bio) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    await queryAsync(connection, insertQuery, [
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
    ]);

    return res.status(201).send('Completed fill personal information');
  } catch (error) {
    console.error('Error processing info form:', error);
    return res.status(500).send('Internal Server Error');
  } finally {
    if (profile_picture) fs.unlinkSync(profile_picture.path);
    if (connection) connection.end();
  }
};

const updateUserInfo = async (req, res) => {
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

  let connection;

  try {
    connection = connectDb();

    const query = `SELECT * FROM userInfo WHERE user_info_id = ?;`;

    const existingUser = await queryAsync(connection, query, [decodedToken._id]);

    if (existingUser.length === 0) {
      if (profile_picture) fs.unlinkSync(profile_picture.path);
      return res.status(404).send("User not found");
    }

    let imageURL = existingUser[0].profile_picture;

    if (profile_picture) {
      if (imageURL) {
        const publicId = imageURL.split('/').pop().split('.')[0]; // Extract public ID from URL
        await cloudinary.uploader.destroy(publicId); // Delete the old image
      }
      const uploadResult = await cloudinary.uploader.upload(profile_picture.path, {
        public_id: profile_picture.originalname,
      });
      imageURL = uploadResult.secure_url;
    }

    const updateQuery = `
      UPDATE userInfo
      SET firstname = ?, lastname = ?, profile_picture = ?, gender = ?, birthdate = ?, Sub_District = ?, District = ?, City = ?, Country = ?, Postcode = ?, bio = ?
      WHERE user_info_id = ?;
    `;

    await queryAsync(connection, updateQuery, [
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
      decodedToken._id,
    ]);

    return res.status(200).send("User information updated");
  } catch (error) {
    console.error("Error updating user information:", error);
    return res.status(500).send("Internal Server Error");
  } finally {
    if (profile_picture) fs.unlinkSync(profile_picture.path);
    if (connection) connection.end();
  }
};

const getUserInfo = async (req, res) => {
  const token = req.cookies.token_auth;
  const decodedToken = jwt.decode(token);

  let connection;

  try {
    connection = connectDb();
    const query = `SELECT * FROM userInfo WHERE user_info_id = ?;`;

    const user = await queryAsync(connection, query, [decodedToken._id]);

    if (user.length === 0) {
      return res.status(404).send("User not found");
    }

    return res.status(200).send(user[0]);
  } catch (error) {
    console.error("Error retrieving user information:", error);
    return res.status(500).send("Internal Server Error");
  } finally {
    if (connection) connection.end();
  }
};

export { infoForm, updateUserInfo, getUserInfo };
