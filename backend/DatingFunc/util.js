import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import {v2 as cloudinary} from 'cloudinary';
import { infoFormModel } from '../db/db';
import fs from 'fs';
          
cloudinary.config({ 
  cloud_name: 'dhudcf11t', 
  api_key: '524947196344864', 
  api_secret: 'tebm4Umkq5tx0BHiSPyVn52g1rY' 
});

const router_dating = express.Router();
const upload = multer({dest: 'temp/'});

const ImageSchema = new mongoose.Schema({
    profile_picture: String,
})

const ImageModel = mongoose.model('Image', ImageSchema);

router_dating.post('/infoform', upload.single('profile_picture'), async (req, res) => {
    const profile_picture = req.file;
    const {name, age, gender, birthdate, Sub_District, District, City, Country, Postcode, bio} = req.body;
    try {
        cloudinary.uploader.upload(profile_picture.path, {
            public_id: profile_picture.originalname,
        }, async (err, result) => {
            if (err) {
                res.status(500).send('Fuck up');
            } else {
                const imageURL = result.secure_url;
                const image = new ImageModel({
                    profile_picture: imageURL,
                });
                await image.save();
                fs.unlinkSync(req.file.path);
                res.status(201).send('Image uploaded');
            }
        })
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
})

export default router_dating;