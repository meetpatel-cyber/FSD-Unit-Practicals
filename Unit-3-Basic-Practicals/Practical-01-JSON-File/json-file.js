const fs = require("fs");

const student = {
    name: "Raj",
    course: "Full Stack"
};

fs.writeFile("student.json", JSON.stringify(student), (err) => {
    if (err) throw err;

    console.log("JSON file saved");

    fs.readFile("student.json", "utf-8", (err, data) => {
        if (err) {
            console.log("Error reading file:", err);
            return;
        }

        const student = JSON.parse(data);

        console.log("Name:", student.name);
        console.log("Course:", student.course);
    });
});