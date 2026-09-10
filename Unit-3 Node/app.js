import http from "http"
import pages from "./pages.js";

const server = http.createServer((req,res)=>{
    if(req.url==="/"){
        res.writeHead(200,{"content-type":"text/html"});
        res.end(pages.home());
    }
    else if(req.url==="/about"){
        res.writeHead(200,{"content-type":"text/html"});
        res.end(pages.about());
    }
    else if(req.url==="/contact"){
        res.writeHead(200,{"content-type":"text/html"});
        res.end(pages.contact());
    }
    else{
        res.writeHead(404,{"content-type":"text/html"});
        res.end(pages.nopage());
    }
});
server.listen(3000,()=>{
    console.log("Server is Running on http://localhost:3000")
});