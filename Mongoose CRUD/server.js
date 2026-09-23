import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

//Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/college")
    .then(async()=>{
        console.log("Database connected");
    });

const userSchema = new mongoose.Schema({
    name: {
            type: String,
            required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {

    }
});

//Creating Model
const User = mongoose.model("User", userSchema);

//CREATE
app.post("/users", async (req,res)=>{
    try{
        const user = await User.create(req.body);

        res.status(201).json({
            message: "User created successfully",
            data: user
        });
    }
    catch(error){
        res.status(404)
    }
});