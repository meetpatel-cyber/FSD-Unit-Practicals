const http = require("http")
const server = http.createServer((req,res)=>{
    res.writeHead(200,{
        "content-type":"text/html"
    })
    res.write(`
            <html>
                <head>
                    <title>Node Server</title>
                </head>
                <body>
                    <h1>Hi this is node server</h1>
                    <h2>This is subtitle</h2>
                </body>
            </html>
        `);
    res.end();
});

server.listen(3000,()=>{
    console.log("Server is running on http://localhost:3000");
})