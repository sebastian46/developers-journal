const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware"); // Import your JWT verification middleware
const { body, validationResult } = require("express-validator");

// Register route with validation
router.post(
  "/register",
  [
    body("username").isLength({ min: 5 }).trim().escape(),
    body("password").isLength({ min: 6 }),
    // Add validation for other fields if you have added them to your User model
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract data from request body
    const { username, password } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).send("Username already exists");
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user and save it to the database
      const newUser = new User({
        username,
        password: hashedPassword,
        // Include other fields if necessary
      });

      await newUser.save();

      res.status(201).send("User registered successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred during registration");
    }
  }
);

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
  [
    body("email").isEmail().normalizeEmail(),
    body("website").optional().isURL(),
    body("github").optional().isURL(),
    // Add other fields as needed
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Assuming your verifyToken middleware adds the user's ID to the request object
      const userId = req.user._id;

      // Get the user by ID and update their profile
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: req.body }, // Update the fields that are provided in the request body
        { new: true } // Return the updated document
      );

      if (!updatedUser) {
        return res.status(404).send("User not found.");
      }

      // Optionally remove sensitive data before sending back the response
      updatedUser.password = undefined;

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).send("An error occurred while updating the profile.");
      console.error(error);
    }
  }
);

module.exports = router;
