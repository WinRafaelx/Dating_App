import express from "express";
import multer from "multer";
import { infoForm } from "./infoForm/InfoForm.js";
import { preferenceForm } from "./preferenceForm/PreferenceForm.js";
import { matching } from "./matchingForm/Matching.js";
import { likeForm } from "./likeForm/LikeForm.js";
import { isRead, getMessages, sendMessage } from "./chatForm/ChatForm.js";

const router_dating = express.Router();
const upload = multer({ dest: "temp/" });

router_dating.post("/infoform", upload.single("profile_picture"), infoForm);

router_dating.post("/preferenceform", preferenceForm);

router_dating.get("/matching", matching);

router_dating.post("/likeform", likeForm);

router_dating.get("/messageform", getMessages);
router_dating.post("/messageform", sendMessage);
router_dating.post("/messageform/isRead", isRead);

export default router_dating;
