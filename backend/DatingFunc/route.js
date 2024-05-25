import express from "express";
import multer from "multer";
import { infoForm, updateUserInfo, getUserInfo } from "./infoForm/InfoForm.js";
import { preferenceForm } from "./preferenceForm/PreferenceForm.js";
import { matching } from "./matchingForm/Matching.js";
import { likeForm } from "./likeForm/LikeForm.js";
import {
  isRead,
  getMessages,
  sendMessage,
  getAvailableChats,
} from "./chatForm/ChatForm.js";
import { blockForm } from "./blockForm/BlockForm.js";
import { reportForm } from "./reportForm/ReportForm.js";
import path from "path";

const router_dating = express.Router();
// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "temp/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Specify the field name for the file upload and allow it to be optional
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images only!");
    }
  },
});

// get user info
router_dating.get("/userinfo", getUserInfo);
router_dating.post("/infoform", upload.single("profile_picture"), infoForm);
router_dating.put("/infoform", upload.single("profile_picture"), updateUserInfo);

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
