const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js"); // Your User model
const cookie = require("cookie");

// JWT Secret Key (Ensure to keep it secure and unique in production)
const JWT_SECRET_KEY = "yourSecretKey";

// Signup Controller
const signup = async (req, res) => {
  try {
    const { name,email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Login Controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare the password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create a JWT token for the user
    const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, { expiresIn: "1h" });

    // Set the JWT token in cookies
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false, // Only use secure cookies in production
      sameSite: "lax", // Prevent CSRF attacks
    });

    // Respond with success
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Logout Controller
const logout = (req, res) => {
  try {
    // Clear the JWT token from cookies
    res.clearCookie("authToken");

    // Respond with success
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { signup, login, logout };
