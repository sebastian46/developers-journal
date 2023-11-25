const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tagName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  details: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;
