
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.use(express.static("public"));

// Handle client connections
io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Receive and broadcast chat messages
    socket.on("chatMessage", (message) => {
        const cleanMessage = String(message).trim();

        if (cleanMessage !== "") {
            console.log("Message:", cleanMessage);
            io.emit("chatMessage", cleanMessage);
        }
    });

    // Handle client disconnection
    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

// Start server
const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
