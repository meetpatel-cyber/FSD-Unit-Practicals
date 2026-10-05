const http = require("http");

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.end("<h1>This is the Home Page</h1>");
    }
    else if (req.url === "/about") {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.end("<h1>This is About Us Page</h1>");
    }
    else if (req.url === "/contact") {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.end("<h1>This is Contact Page</h1>");
    }
    else {
        res.writeHead(404, {
            "Content-Type": "text/html"
        });
        res.end("<h1>Page not found</h1>");
    }
});

const port = 3000;

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});