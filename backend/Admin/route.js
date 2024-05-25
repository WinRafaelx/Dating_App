import express from "express";
import { getUsers } from "./controller/UserAuthTable.js";

const router = express.Router();

router.get("/userAuth", getUsers);

export default router;
