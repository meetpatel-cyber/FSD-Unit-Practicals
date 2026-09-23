import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/college")
    .then(async()=>{
        console.log("Database connected");
        const studentSchema = new mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            age: {
                type: Number,
                required: true
            },
            course: String
        });
    });