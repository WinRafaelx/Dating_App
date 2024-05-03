import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import { infoFormModel } from "../db/db.js";
import fs from "fs";
import jwt from "jsonwebtoken";

cloudinary.config({
  cloud_name: "dhudcf11t",
  api_key: "524947196344864",
  api_secret: "tebm4Umkq5tx0BHiSPyVn52g1rY",
});

const router_dating = express.Router();
const upload = multer({ dest: "temp/" });

const ImageSchema = new mongoose.Schema({
  profile_picture: String,
});

const ImageModel = mongoose.model("Image", ImageSchema);

router_dating.post(
  "/infoform",
  upload.single("profile_picture"),
  async (req, res) => {
    const profile_picture = req.file;
    const {
      firstname,
      lastname,
      age,
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
    let decodedToken = null;

    // Check if token exists
    if (!token) {
      console.log("Token not found");
      res.sendStatus(401);
    } else {
      decodedToken = jwt.decode(token);
    }

    try {
      cloudinary.uploader.upload(
        profile_picture.path,
        {
          public_id: profile_picture.originalname,
        },
        async (err, result) => {
          if (err) {
            res.status(500).send("Fuck up");
          } else {
            const imageURL = result.secure_url;
            const infoFormDB = new infoFormModel({
              _id: decodedToken._id,
              firstname: firstname,
              lastname: lastname,
              age: age,
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
            fs.unlinkSync(req.file.path);
            res.status(201).send("Completed fill personal information");
          }
        }
      );
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }
);

router_dating.post("/what", (req, res) => {
    const token = req.cookies.token_auth
    const _id = jwt.decode(token)
    console.log(req.body.username_email)
    
    res.send("Testing")
})

export default router_dating;
