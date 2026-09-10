//Event module (events) THIS IS FOR THEORY ONLY 

const EventEmmiter = require("events");
const { EventEmitter } = require("stream");
const eventEmmiter = new EventEmmiter();
eventEmmiter.on("Welcome",(name)=>{
    console.log("Welcome to Node.js\n");
    console.log(`Good morning ${name}`);
});
eventEmmiter.on("Welcome",(name)=>{
    console.log("Welcome to Node.js\n");
    console.log(`Good morning ${name}`);
});
eventEmmiter.emit("Welcome","ABC");

eventEmmiter.on("login",()=>{
    console.log("login sucessfully")
})

eventEmmiter.on("login",()=>{
    console.log("welcome to dasbord")
})

eventEmmiter.once("start",()=>{
    console.log("application started")
})

eventEmmiter.emit("login")
eventEmmiter.emit("start")