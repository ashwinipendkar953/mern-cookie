// backend/server.js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.post("/login", (req, res) => {
  const { username } = req.body;

  if (username) {
    res.cookie("username", username, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 3600000,
    });
    return res.status(200).json({ message: "Login successful" });
  }
  res.status(400).json({ message: "Invalid credentials" });
});

app.get("/check-cookie", (req, res) => {
  const username = req.cookies.username;
  if (username) {
    return res.status(200).json({ message: `Hello, ${username}` });
  }
  res.status(401).json({ message: "No cookie found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
