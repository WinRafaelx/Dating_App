import { io } from "../../index.js";
import { messageModel, chatModel } from "../../db/db.js";
import jwt from "jsonwebtoken";

const getMessages = async (req, res) => {
    const { chatId } = req.query;
    // res.send("ChatID: " + chatId);
    const messages = await messageModel.find({ Chat_ID: chatId });
    res.json(messages);
}

const sendMessage = async (req, res) => {
    const { message, sendto } = req.body;
    const token = req.cookies.token_auth;
    const decodedToken = jwt.decode(token);

    const sender = decodedToken._id;

    const checkChatId = await chatModel.findOne({
        $or: [
            { User1_ID: sender, User2_ID: sendto },
            { User1_ID: sendto, User2_ID: sender }
        ]
    });

    if (!checkChatId) {
        const newChat = new chatModel({
            User1_ID: sender,
            User2_ID: sendto
        });
        await newChat.save();
    }

    const newMessage = new messageModel({
        Chat_ID: checkChatId._id,
        Sender_ID: sender,
        Receiver_ID: sendto,
        Message: message,
        isRead: false,
        isRead_time: null
    });
    await newMessage.save();
    io.emit("message", newMessage);
    res.status(201).send("Message sent");
}

const isRead = async (req, res) => {
    const { chatId, sender } = req.body; // sender คือ id คนที่ถูกอ่านข้อความ
    const messages = await messageModel.updateMany({ Chat_ID: chatId, Sender_ID: sender, isRead: false }, { isRead: true, isRead_time: Date.now() });
    res.json(messages);
}

export { getMessages, sendMessage, isRead }