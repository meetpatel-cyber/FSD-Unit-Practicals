import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

// ===============================
// User Schema
// ===============================
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
});

// ===============================
// User Model
// ===============================
const User = mongoose.model("User", userSchema);

// ===============================
// CREATE USER
// POST /user
// ===============================
app.post("/user", async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// ===============================
// HOME
// GET /
// ===============================
app.get("/", (req, res) => {
  res.send("Server running");
});

// ===============================
// GET ALL USERS
// GET /users
// ===============================
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ===============================
// CONNECT MONGODB
// ===============================
mongoose
  .connect("mongodb://127.0.0.1:27017/collage")
  .then(() => {
    console.log("MongoDB connected");

    // Start server ONLY after MongoDB connects
    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:");
    console.error(error.message);
  });
