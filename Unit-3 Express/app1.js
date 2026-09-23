import express from "express";
const app = express();

app.get("/",(req,res)=>{
    res.send("This is Home page content")
});
app.get("/about",(req,res)=>{
    const { name,category } = req.query;
    res.send(`Query string Values name - ${name} and category - ${category}`)
    // res.send("This is About page content")
});
app.get("/users/:id",(req,res)=>{
    res.send(`The User id is ${req.params.id}`)
});
app.get("/contact",(req,res)=>{
    res.send("This is Contact page content")
});
app.get("/student",(req,res)=>{
    res.send("This is Student page content")
});
app.use((req,res)=>{
    res.status(404).send("404 - Page not found")
})

app.listen(3000,()=>{
    console.log("Server running on http://localhost:3000")
})