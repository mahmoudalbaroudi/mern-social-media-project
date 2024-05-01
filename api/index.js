const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3000;

const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/users.js");
const postRoutes = require("./routes/posts.js");
const multer = require("multer");
const path = require("path");

const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.json());
app.use(morgan("common"));

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
app.use("/images", express.static(path.join(__dirname, "public/images")));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (error) {}
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(port, () => {
  console.log("backend server is running on port " + port);
});
