const express = require("express");
const router = express.Router();
const JournalEntry = require("./models/journalEntry");
const verifyToken = require("./middleware/authMiddleware"); // Assuming you have this middleware

// POST endpoint to create a new journal entry
router.post("/", verifyToken, async (req, res) => {
  try {
    const { date, title, details } = req.body;
    const userId = req.user._id; // Assuming verifyToken middleware adds user to req

    const newEntry = new JournalEntry({
      userId,
      date,
      title,
      details,
    });

    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error saving journal entry", error: error.message });
  }
});

// GET endpoint to retrieve journal entries for a user
router.get("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user._id; // User's ID from the token
    const entries = await JournalEntry.find({ userId });
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching journal entries",
      error: error.message,
    });
  }
});

module.exports = router;
