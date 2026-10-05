const fs = require("fs");

const studentData = `
Name: Raj
Course: Full Stack
Year: SY
City: Ahmedabad
`;

fs.writeFile("student.txt", studentData, (err) => {
    if (err) {
        console.log("Error writing file:", err);
        return;
    }

    console.log("Student data written successfully.\n");

    fs.readFile("student.txt", "utf-8", (err, data) => {
        if (err) {
            console.log("Error reading file:", err);
            return;
        }

        console.log("File Content:\n");
        console.log(data);

        fs.unlink("student.txt", (err) => {
            if (err) {
                console.log("Error deleting file:", err);
                return;
            }

            console.log("File deleted successfully.");
        });
    });
});