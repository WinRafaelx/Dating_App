import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';

const router_dating = express.Router();

const upload = multer({dest: 'uploads/'});

const ImageSchema = new mongoose.Schema({
    profile_picture: String,
})

const ImageModel = mongoose.model('Image', ImageSchema);

router_dating.post('/infoform', upload.single('image'), async (req, res) => {
    // const {profile_picture, gender, birthdate, Sub_District, District, City, bio} = req.body;
    try {
        const image = new ImageModel({
            profile_picture: req.file.path,
        });
        await image.save();
        res.status(201).send('Image uploaded');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
})

export default router_dating;