const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Ensure this points to your deployed frontend
    credentials: true, // Allow credentials like cookies
  })
);
app.use(express.json());
app.use(cookieParser());

// Login route
app.post("/api/login", (req, res) => {
  const { username } = req.body;

  if (username) {
    res.cookie("username", username, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only send the cookie over HTTPS
      sameSite: "None", // Necessary for cross-origin cookies
      maxAge: 3600000, // Cookie expiration time (1 hour)
    });
    return res.status(200).json({ message: "Login successful" });
  }
  res.status(400).json({ message: "Invalid credentials" });
});

// Check cookie route
app.get("/api/check-cookie", (req, res) => {
  const username = req.cookies.username;
  if (username) {
    return res.status(200).json({ message: `Hello, ${username}` });
  }
  res.status(401).json({ message: "No cookie found" });
});

// Start the server (not necessary in Vercel)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
