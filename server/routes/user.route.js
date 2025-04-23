const express = require("express");
const { signup, login, logout } = require("../controllers/user.controller.js");

const {authenticateUser} = require("../middlewares/user.middleware.js");

const router = express.Router();

// Signup Route
router.post("/signup", signup);

// Login Route
router.post("/login", login);

// Logout Route
router.post("/logout", logout);

router.get("/profile", authenticateUser, (req, res) => {
    res.json({ message: "You are logged in", user: req.user });
});
  

module.exports = router;
