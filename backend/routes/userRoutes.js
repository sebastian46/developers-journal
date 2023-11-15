const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware"); // Import your JWT verification middleware
const { body, validationResult } = require("express-validator");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // You need to create this directory if it doesn't exist
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Endpoint to get user profile
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const userId = req.user._id; // The user ID should be attached to the request by the verifyToken middleware

    const user = await User.findById(userId).select("-password"); // Select all fields except password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user); // Send user data back to client
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error occurred" });
  }
});

// Endpoint to update user password
router.post(
  "/update-password",
  verifyToken,
  [body("newPassword").isLength({ min: 6 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const userId = req.user._id;
      const { newPassword } = req.body;

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await User.findByIdAndUpdate(userId, { password: hashedPassword });

      res.status(200).send("Password updated successfully.");
    } catch (error) {
      res.status(500).send("An error occurred while updating the password.");
    }
  }
);

// Endpoint to update user profile
router.post(
  "/update-profile",
  verifyToken,
  upload.single("avatar"),
  [
    body("email").optional({ checkFalsy: true }).isEmail().normalizeEmail(),
    body("website").optional({ checkFalsy: true }).isURL(),
    body("github").optional({ checkFalsy: true }).isURL(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const userId = req.user._id;
      const updateData = {
        ...req.body,
        ...(req.file && { avatarUrl: req.file.path }),
      };

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updateData },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).send("User not found.");
      }

      updatedUser.password = undefined; // Remove sensitive data
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while updating the profile.");
    }
  }
);

module.exports = router;
