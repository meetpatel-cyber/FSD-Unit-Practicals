const express = require("express");
const app = express();

const port = 8080;

app.get("/", (req, res) => {
    res.send("GET request to the homepage");
});

app.post("/", (req, res) => {
    res.send("POST request to the homepage");
});

app.get("/about", (req, res) => {
    res.send("About page");
});

app.use((req, res) => {
    res.status(404).send("404 - Page not found");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});