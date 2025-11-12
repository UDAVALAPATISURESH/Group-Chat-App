const express = require("express");
const router = express.Router();
const db = require("../config/db");

// 🟢 POST - Save a new chat message
router.post("/", async (req, res) => {
  const { userId, message } = req.body;

  if (!userId || !message) {
    return res.status(400).json({ message: "userId and message required" });
  }

  const sql = "INSERT INTO messages (userId, message) VALUES (?, ?)";
  db.query(sql, [userId, message], (err, result) => {
    if (err) {
      console.error("❌ MySQL Insert Error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(201).json({
      message: "Message saved",
      data: { id: result.insertId, userId, message },
    });
  });
});

// 🟢 GET - Fetch all messages
router.get("/", (req, res) => {
  const sql = "SELECT * FROM messages ORDER BY createdAt ASC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ MySQL Fetch Error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(200).json(results);
  });
});

module.exports = router;
