require("dotenv").config();

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { body, validationResult } = require("express-validator");
const User = require("./models/User"); // Assuming you have a User model
const journalEntryRoutes = require("./routes/journalEntryRoutes");
const userRoutes = require("./routes/userRoutes");

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/developer-journal");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("We're connected to the database!");
});

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/api/journal", journalEntryRoutes);
app.use("/api/users", userRoutes);

const JWT_SECRET = process.env.JWT_SECRET; // Store this securely

app.post(
  "/login",
  [
    body("username").not().isEmpty().withMessage("Username is required"),
    body("password").not().isEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: "Invalid username" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: "1h",
      });
      res.send({ token });
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred during login");
    }
  }
);

app.post(
  "/register",
  [
    body("username").isLength({ min: 5 }).trim().escape(),
    body("password").isLength({ min: 6 }),
    // Add validation for other fields if necessary
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).send("Username already exists");
      }

      const user = new User({ username, password });
      await user.save(); // Pre-save hook will hash the password

      res.status(201).send("User registered successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
    }
  }
);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
