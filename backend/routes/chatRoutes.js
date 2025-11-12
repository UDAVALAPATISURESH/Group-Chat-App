const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// 🟢 POST - Save a new chat message
router.post("/", async (req, res) => {
  try {
    const { userId, message } = req.body;

    if (!userId || !message) {
      return res.status(400).json({ message: "userId and message required" });
    }

    const newMessage = new Message({ userId, message });
    await newMessage.save();

    res.status(201).json({ message: "Message saved", data: newMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🟢 GET - Fetch all messages
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
