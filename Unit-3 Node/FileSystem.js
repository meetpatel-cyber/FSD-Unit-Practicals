const fs = require("fs");

//Create File
fs.writeFile("Student.txt","Hello There",(err)=>{
    if(err){
        console.log("Error while writting the detail");
        return;
    }
    console.log("Successfull......")
})

//Read File
fs.readFile("student.txt","utf-8",(err,data)=>{
    if(err){
        console.log("Error while writting the detail");
        return;
    }
    console.log(data)
})

//Add File Name
fs.appendFile("student.txt","\n This is the new line",(err)=>{
    if(err){
        console.log("Error while writting the detail");
        return;
    }
    console.log("Successful Add new line")
})

//Rename File Name
fs.rename("student.txt","Student.txt",(err)=>{
    if(err){
        console.log("Error while writting the detail");
        return;
    }
    console.log("Rename Successful")
})

//Delete File
fs.unlink("Student.txt",(err)=>{
    if(err){
        console.log("Error while writting the detail");
        return;
    }
    console.log("Delete Successful")
})

//Check File
if(fs.existsSync("./Meet/Meet.txt")){
    console.log("File Exists")
}
else{
    console.log("File not exist")
}