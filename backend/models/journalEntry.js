const mongoose = require("mongoose");

const journalEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
});

const JournalEntry = mongoose.model("JournalEntry", journalEntrySchema);

module.exports = JournalEntry;
