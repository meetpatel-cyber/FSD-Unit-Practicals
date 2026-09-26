import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

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
// HOME
// GET /
// ===============================
app.get("/", (req, res) => {
  res.send("Server running");
});

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

//================================
//GET One User
//GET/user:id
//================================

app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

//================================
//PUT USER
//PUT/user/:id
//================================

app.put("/user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

//================================
//PATCH USER
//PATCH/user/:id
//================================

app.patch("/user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// ===============================
//DELETE USER
//DELETE/user/:id
// ===============================

app.delete("/user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});