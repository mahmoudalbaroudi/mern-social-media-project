const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const bcrypt = require("bcrypt");

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json("Email already in use");
    }

    // Generate a new password hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json("Internal server error");
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    // Check if the user exists
    if (!user) {
      // User not found
      return res.status(404).json({ error: "User not found" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      // Password does not match
      return res.status(400).json({ error: "Invalid password" });
    }

    // Successful login
    res.json(user);
  } catch (error) {
    // Handle other errors

    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
