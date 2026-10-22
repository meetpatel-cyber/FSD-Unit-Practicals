const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const app = express();
app.use(express.json());

const SECRET_KEY = "mysecretkey";

mongoose
    .connect("mongodb://127.0.0.1:27017/jwt_auth")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error.message);
    });

app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: "Registration successful"
        });
    } catch (error) {
        console.error("Registration error:", error.message);
        res.status(500).json({
            message: "Registration failed"
        });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.json({
            message: "Login successful",
            token
        });
    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({
            message: "Login failed"
        });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
