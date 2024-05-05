import express from "express";
import multer from "multer";
import { infoForm } from "./infoForm/InfoForm.js";
import { preferenceForm } from "./preferenceForm/PreferenceForm.js";
import { matching } from "./matchingForm/Matching.js";
import { likeForm } from "./likeForm/LikeForm.js";

const router_dating = express.Router();
const upload = multer({ dest: "temp/" });

router_dating.post("/infoform", upload.single("profile_picture"), infoForm);
router_dating.post("/preferenceform", preferenceForm);
router_dating.get("/matching", matching);
router_dating.post("/likeform", likeForm);

export default router_dating;
