import { io } from "../../index.js";
import jwt from "jsonwebtoken";
import { connectDb } from "../../db/db.js";

const getMessages = async (req, res) => {
  const { chatId } = req.query;
  const connection = await connectDb();

  try {
    const messageQuery = `
      SELECT 
        m.message_id,
        m.Chat_ID,
        m.Sender_ID,
        CONCAT(sender.firstname, ' ', sender.lastname) AS sender_name,
        m.Receiver_ID,
        CONCAT(receiver.firstname, ' ', receiver.lastname) AS receiver_name,
        m.Message,
        m.isRead,
        m.isRead_time,
        m.created_at,
        m.updated_at
      FROM messages m
      JOIN userInfo sender ON m.Sender_ID = sender.user_info_id
      JOIN userInfo receiver ON m.Receiver_ID = receiver.user_info_id
      WHERE m.Chat_ID = ?
    `;
    connection.query(messageQuery, [chatId], (err, messages) => {
      if (err) {
        console.error("Error retrieving messages:", err);
        return res.status(500).send("Internal Server Error");
      }
      connection.end();
      res.json(messages);
    });
  } catch (err) {
    console.error("Error retrieving messages:", err);
    connection.end();
    res.status(500).send("Internal Server Error");
  }
};

const sendMessage = async (req, res) => {
  const { message, sendto } = req.body;
  const token = req.cookies.token_auth;
  const decodedToken = jwt.decode(token);
  const sender = decodedToken._id;

  const connection = await connectDb();

  try {
    connection.query(
      "SELECT * FROM chats WHERE (User1_ID = ? AND User2_ID = ?) OR (User1_ID = ? AND User2_ID = ?)",
      [sender, sendto, sendto, sender],
      (err, chat) => {
        if (err) {
          console.error("Error checking for existing chat:", err);
          return res.status(500).send("Internal Server Error");
        }
        const chatId = chat[0].chat_id;
        const newMessage = {
          Chat_ID: chatId,
          Sender_ID: sender,
          Receiver_ID: sendto,
          Message: message,
          isRead: false,
          isRead_time: null,
        };
        connection.query("INSERT INTO messages SET ?", newMessage);
        io.emit("message", newMessage);
        res.status(201).send("Message sent");
      }
    );
  } catch (err) {
    console.error("Error sending message:", err);
    connection.end();
    res.status(500).send("Internal Server Error");
  }
};

const isRead = async (req, res) => {
  const { chatId, sender } = req.body;
  const connection = await connectDb();

  try {
    connection.query(
      "UPDATE messages SET isRead = true, isRead_time = ? WHERE Chat_ID = ? AND Sender_ID = ? AND isRead = false",
      [new Date(), chatId, sender],
      (err, result) => {
        if (err) {
          console.error("Error updating messages:", err);
          return res.status(500).send("Internal Server Error");
        }
        connection.end();
        res.json(result);
      }
    );
  } catch (err) {
    console.error("Error updating messages:", err);
    connecttion.end();
    res.status(500).send("Internal Server Error");
  }
};

export { getMessages, sendMessage, isRead };
