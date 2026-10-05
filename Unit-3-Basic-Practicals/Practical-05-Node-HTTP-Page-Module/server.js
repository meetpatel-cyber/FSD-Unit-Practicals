import http from "http";
import page from "./pages.js";

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.end(page.home());
    }
    else if (req.url === "/about") {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.end(page.about());
    }
    else if (req.url === "/contact") {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.end(page.contact());
    }
    else {
        res.writeHead(404, {
            "Content-Type": "text/html"
        });
        res.end("<h1>Page not found</h1>");
    }
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});