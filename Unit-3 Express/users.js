import express from "express";

const app = express();
const PORT = 3000;

function menu() {
    return `
        <nav>
            <a href="/">Home</a> |
            <a href="/users">Users</a> |
            <a href="/about">About</a>
        </nav>
    `;
}

const users = [
    {
        id: 101,
        user_name: "ABC",
        course: "BCA",
        sem: "1st semester"
    },
    {
        id: 102,
        user_name: "XYZ",
        course: "BCA",
        sem: "2nd semester"
    },
    {
        id: 103,
        user_name: "MNO",
        course: "BCA",
        sem: "3rd semester"
    }
];

app.get("/", (req, res) => {
    res.send(`
        ${menu()}
        <h2>Home</h2>
        <p>This is Home Page</p>
    `);
});

app.get("/users", (req, res) => {
    let output = `
        ${menu()}
        <h2>User List</h2>
        <ul>
    `;

    users.forEach(user => {
        output += `
            <li>
                <a href="/users/${user.id}">${user.user_name}</a>
            </li>
        `;
    });

    output += `
        </ul>
    `;

    res.send(output);
});

app.get("/users/:id", (req, res) => {
    const id = Number(req.params.id);

    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).send(`
            ${menu()}
            <h2>User Not Found</h2>
            <p>No user exists with ID ${id}.</p>
        `);
    }

    res.send(`
        ${menu()}
        <h2>User Details</h2>
        <p>ID: ${user.id}</p>
        <p>Name: ${user.user_name}</p>
        <p>Course: ${user.course}</p>
        <p>Semester: ${user.sem}</p>
    `);
});

app.get("/about", (req, res) => {
    res.send(`
        ${menu()}
        <h2>About</h2>
        <p>This is the About Page.</p>
    `);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
