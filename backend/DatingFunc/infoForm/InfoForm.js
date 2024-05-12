import mysql from 'mysql';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import { connectDb } from '../db/db.js';

// Function to connect to MySQL
const connectDb = connectDb;

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
    const age = calculateAge(birthdate);
    const token = req.cookies.token_auth;
    const decodedToken = jwt.decode(token);

    try {
        const connection = await connectDb();
        connection.connect();

        // Check if user already exists
        const query = `
            SELECT * FROM userInfo WHERE (firstname = ? AND lastname = ?) OR user_id = ?;
        `;
        const result = await connection.query(query, [firstname, lastname, decodedToken._id]);

        if (result.length > 0) {
            // Clean up the uploaded image
            fs.unlinkSync(profile_picture.path);
            connection.end();
            return res.status(409).send("User already exists");
        }

        // Upload image to Cloudinary (if needed) and get image URL

        // Save user information to the database
        const insertQuery = `
            INSERT INTO userInfo (user_id, firstname, lastname, profile_picture, gender, birthdate, Sub_District, District, City, Country, Postcode, bio) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;
        await connection.query(insertQuery, [decodedToken._id, firstname, lastname, profile_picture.path, gender, birthdate, Sub_District, District, City, Country, Postcode, bio]);

        // Clean up the uploaded image
        fs.unlinkSync(profile_picture.path);
        connection.end();

        return res.status(201).send("Completed fill personal information");
    } catch (error) {
        // Clean up the uploaded image
        fs.unlinkSync(profile_picture.path);
        return res.status(500).send("Internal Server Error");
    }
};

export { infoForm };
