const http = require("http")

const server = http.createServer((req,res)=>{
    if(req.url==="/"){
        res.write("This is Home Page")
    }
    else if(req.url==="/about"){
        res.write("This is About Page")
    }
    else if(req.url==="/students"){
        res.write("This is Students Page")
    }
    res.end();
});

server.listen(3000,()=>{
    console.log("Server is running on http://localhost:3000")
})