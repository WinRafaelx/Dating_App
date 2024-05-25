import express from "express";
import multer from "multer";
import { infoForm, updateUserInfo, getProfile } from "./infoForm/InfoForm.js";
import { preferenceForm } from "./preferenceForm/PreferenceForm.js";
import { matching } from "./matchingForm/Matching.js";
import { likeForm } from "./likeForm/LikeForm.js";
import { isRead, getMessages, sendMessage, getAvailableChats } from "./chatForm/ChatForm.js";
import { blockForm } from "./blockForm/BlockForm.js";
import { reportForm } from "./reportForm/ReportForm.js";
import router from "../Admin/route.js";

const router_dating = express.Router();
const upload = multer({ dest: "temp/" });

// get user info
router_dating.get("/userinfo", getProfile);
router_dating.post("/infoform", upload.single("profile_picture"), infoForm);
router_dating.post("/updateinfo", updateUserInfo);

router_dating.post("/preferenceform", preferenceForm);

// get matching users
router_dating.get("/matching", matching);

// like a user
router_dating.post("/likeform", likeForm);

// get available chats
router_dating.get("/availablechats", getAvailableChats);
// message management like get, send, read
router_dating.get("/messageform", getMessages);
router_dating.post("/messageform", sendMessage);
router_dating.post("/messageform/isRead", isRead);

// block a user
router_dating.post("/blockform", blockForm);

// report a user
router_dating.post("/reportform", reportForm);

export default router_dating;
