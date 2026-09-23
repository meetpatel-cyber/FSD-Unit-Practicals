import express from 'express';
const app = express();
const PORT = 3000;

const students = [
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

app.use(express.json());

app.use((req,res,next)=>{
    console.log(`${new Date().toLocaleString()} - ${req.method} ${req.url}`);
    next();
});

app.get("/",(req,res)=>{
    res.send("Home page")
});

app.get("/students",(req,res)=>{
    res.status(200).json({
        messgae: "Student fetch successfully",
        data: students
    });
});

app.get("/search",(req,res)=>{
    const course = req.query.course;
    if(!course){
        res.status(404).json({
            message:"Please enter correct Course"
        });
    }
    const student = students.filter(
        s=>s.course.toLowerCase() == course.toLowerCase()
    );
    if(student){
        res.status(200).json({
            message: "Students fetch successfully",
            data: student
        });
    }
    else{
        res.status(404).json({
            message: "Students not found"
        });
    }
});

app.get("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const student = students.find(student => student.id === id);

    if(student){
        res.status(200).json({
            message: "Students fetch successfully",
            data: student
        });
    }
    else{
        res.status(404).json({
            message: "Students not found"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
