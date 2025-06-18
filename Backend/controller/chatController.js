import Chat from "../models/chatModel.js";
import "dotenv/config";
import axios from "axios";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// Save Chat Message
const saveMessage = async (req, res) => {
  try {
    const userId = req.userId;
    const { sender, message } = req.body;

    if (!sender || !message) {
      return res
        .status(400)
        .json({ success: false, message: "Sender and message required" });
    }

    const userMsg = new Chat({
      userId,
      sender,
      message,
    });

    await userMsg.save();

    console.log("User message saved"); // DEBUG

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o",
        // messages: [{ role: "user", content: message }],
        messages: [
          { role: "system", content: "You are a helpful chatbot assistant." },
          { role: "user", content: message },
        ],
        max_tokens: 1000, // ✅ ADD THIS
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173/",
          "X-Title": "ChatBot",
        },
      }
    );

    const botResponse = response.data.choices[0].message.content;
    console.log("OpenRouter Response:", botResponse);

    const botMsg = new Chat({
      userId,
      sender: "bot",
      message: botResponse,
    });
    await botMsg.save();

    res.status(201).json({
      success: true,
      userMessage: userMsg,
      botMessage: botMsg,
    });
  } catch (error) {
    console.error("Save Chat Error:", error?.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      details: error?.response?.data || error.message,
    });
  }
};

// Get Chat Messages of Authenticated User
const getMessages = async (req, res) => {
  try {
    const messages = await Chat.find({ userId: req.userId });
    res.json({ success: true, data: messages });
  } catch (error) {
    console.error("Get Messages Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { saveMessage, getMessages };
