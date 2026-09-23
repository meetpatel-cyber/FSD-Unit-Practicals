import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/collage")
    .then(async()=>{
        console.log("Database connected");
        const studentSchema = new mongoose.Schema({
            name: {
                 
            },
            age: {

            },
            course: String
        });
    });