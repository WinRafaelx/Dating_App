import { io } from "../../index.js";
import { messageModel } from "../../db/db.js";

const getMessages = async (req, res) => {
    const { chatId } = req.params;
    const messages = await messageModel.find({ chatId: chatId });