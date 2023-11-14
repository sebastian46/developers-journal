const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/User"); // Assuming you have a User model

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/developer-journal");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("We're connected to the database!");
});

const app = express();
app.use(express.json());

const JWT_SECRET = "your_jwt_secret"; // Store this securely

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).send("Invalid username");
  }

  // Check if the password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send("Invalid credentials");
  }

  // Create a token
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

  res.send({ token });
});

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send("Username already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user and save to the database
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).send("User created successfully");
  } catch (error) {
    res.status(500).send("An error occurred");
    console.error(error);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
