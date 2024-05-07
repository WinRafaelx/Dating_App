import { preferenceModel } from "../../db/db.js";
import jwt from "jsonwebtoken";

const preferenceForm = async (req, res) => {
    const { preferred_age_min, preferred_age_max, preferred_gender } = req.body;
    const token = req.cookies.token_auth;
    const decodedToken = jwt.decode(token);

    try {
        let preferences = await preferenceModel.findOne({ _id: decodedToken._id });

        if (preferences) {
            // If preferences exist, update them
            preferences.preferred_age_min = preferred_age_min;
            preferences.preferred_age_max = preferred_age_max;
            preferences.preferred_gender = preferred_gender;
            await preferences.save();
            res.status(200).send("Preferences updated");
        } else {
            // If preferences do not exist, create new preferences
            const newPreference = new preferenceModel({
                _id: decodedToken._id,
                preferred_age_min: preferred_age_min,
                preferred_age_max: preferred_age_max,
                preferred_gender: preferred_gender
            });
            await newPreference.save();
            res.status(201).send("Preferences created");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export { preferenceForm };
