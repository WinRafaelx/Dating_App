import { v2 as cloudinary } from "cloudinary";
import { infoFormModel } from "../../db/db.js";
import fs from "fs";
import jwt from "jsonwebtoken";

cloudinary.config({
  cloud_name: "dhudcf11t",
  api_key: "524947196344864",
  api_secret: "tebm4Umkq5tx0BHiSPyVn52g1rY",
});

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
  let decodedToken = null;

  // Check if token exists
  if (!token) {
    console.log("Token not found");
    fs.unlinkSync(profile_picture.path);
    res.sendStatus(401);
  } else {
    decodedToken = jwt.decode(token);
  }

  try {
    const users = await infoFormModel.find({
      $or: [
        { $and: [{ firstname: firstname }, { lastname: lastname }] },
        { _id: decodedToken._id },
      ],
    });

    if (users.length > 0) {
      // Clean up the uploaded image
      fs.unlinkSync(profile_picture.path);
      return res.status(409).send("User already exists");
    }

    cloudinary.uploader.upload(
      profile_picture.path,
      {
        public_id: profile_picture.originalname,
      },
      async (err, result) => {
        if (err) {
          // Clean up the uploaded image
          fs.unlinkSync(profile_picture.path);
          return res.status(500).send("Error uploading image");
        } else {
          const imageURL = result.secure_url;
          const infoFormDB = new infoFormModel({
            _id: decodedToken._id,
            firstname: firstname,
            lastname: lastname,
            profile_picture: imageURL,
            gender: gender,
            birthdate: birthdate,
            Sub_District: Sub_District,
            District: District,
            City: City,
            Country: Country,
            Postcode: Postcode,
            bio: bio,
          });
          await infoFormDB.save();
          // Clean up the uploaded image
          fs.unlinkSync(profile_picture.path);
          return res.status(201).send("Completed fill personal information");
        }
      }
    );
  } catch (error) {
    // Clean up the uploaded image
    fs.unlinkSync(profile_picture.path);
    return res.status(500).send("Internal Server Error");
  }
};

export { infoForm }