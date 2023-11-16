const express = require("express");
const router = express.Router();
const JournalEntry = require("../models/journalEntry");
const verifyToken = require("../middleware/authMiddleware"); // Assuming you have this middleware

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
  const { startDate, endDate, searchQuery } = req.query;
  // console.log(req.query);
  try {
    // console.log(req.query, startDate, endDate);
    let query = {
      userId: req.user._id, // Make sure to only fetch entries for the logged-in user
    };

    // Apply date filters if they exist
    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    } else if (startDate) {
      query.date = { $gte: new Date(startDate) };
    } else if (endDate) {
      query.date = { $lte: new Date(endDate) };
    }

    // Apply search text filter if it exists
    if (searchQuery) {
      query.$or = [
        { title: { $regex: searchQuery, $options: "i" } }, // Case-insensitive search in title
        { details: { $regex: searchQuery, $options: "i" } }, // Case-insensitive search in details
      ];
    }

    // Find entries for the logged-in user within the optional date range
    const entries = await JournalEntry.find(query).sort({ date: -1 }); // Sort by date, newest first
    res.json(entries);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching journal entries",
      error: error.message,
    });
  }
});

module.exports = router;
