import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";

const ENDPOINT = "http://localhost:8000"; // Update with your backend endpoint

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [sendTo, setSendTo] = useState("");
  const [chatId, setChatId] = useState("4b14b5fe-11a8-11ef-a41d-76b4fbdd5d7c"); // Assuming chatId is a fixed value for now

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chat = await axios.get(
          `${ENDPOINT}/app/messageform`,
          {
            params: { chatId },
            withCredentials: true,
          }
        );
        console.log(chat.data);
        setMessages(chat.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchData(); // Load old messages when component mounts

    const socket = socketIOClient(ENDPOINT);

    socket.on("message", async () => {
      fetchData(); // Fetch new messages when a new message arrives
    });

    return () => socket.disconnect();
  }, [chatId]);

  const sendMessage = async () => {
    if (inputMessage.trim() !== "") {
      try {
        await axios.post(
          `${ENDPOINT}/app/messageform`,
          {
            message: inputMessage,
            sendto: sendTo,
          },
          { withCredentials: true }
        );
        setInputMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendToChange = (e) => {
    setSendTo(e.target.value);
  };

  const handleInputFocus = async () => {
    try {
      await axios.post(
        `${ENDPOINT}/app/messageform/isRead`,
        {
          chatId,
          sender: sendTo,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  return (
    <div>
      <h1>Chat App</h1>
      <div>
        <input
          type="text"
          placeholder="Send to username"
          value={sendTo}
          onChange={handleSendToChange}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          onFocus={handleInputFocus}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.sender_name}: </strong>
            {message.Message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
