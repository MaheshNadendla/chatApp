const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const User = require("../models/user.model");

const JWT_SECRET_KEY = "yourSecretKey"; // Keep it same everywhere

// 📌 Express Middleware for API routes
const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.authToken;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

// 📌 Socket.IO Middleware
const authenticateSocket = (socket, next) => {
    try {

        console.log("cookie : ",socket.handshake.headers.cookie)

      const rawCookie = socket.handshake.headers.cookie;
      const cookies = cookie.parse(rawCookie); // Parse cookies
      const token = cookies.authToken;
  
      if (!token) {
        return next(new Error("Authentication error: No token found"));
      }
  
      // Verify JWT token
      jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          return next(new Error("Authentication error: Invalid token"));
        }
        // Attach user data to the socket object
        socket.userId = decoded.id;
        next();  // Allow the connection to proceed
      });
    } catch (error) {
      next(new Error("Authentication error: " + error.message));
    }
  };

module.exports = {
  authenticateUser,
  authenticateSocket
};
