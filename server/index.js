//IMPORTS
//require  is inbuilt funtion to import files 
//Bring express into my file 
//express is a framework of nodejs without express nodejs is difficult
const express = require('express');
//nodejs already has http module (built-in) we use to create server 
const http = require('http');
//connect mongodb,create schemas,store data 
const mongoose = require('mongoose');
const { Socket } = require('socket.io');
//http create server and socket io uses that server for real-time
const io = require (Socket.io)(server);
require('dotenv').config();

//Server
// Create my backend application using Express
const app = express();
const port=process.env.PORT||3000;
var server=http.createServer(app);
var io =require('socket.io')(server);

//middleware
//Whenever request comes, convert JSON data into JavaScript object
app.use(express.json());

//connect to mongodb
//Get MongoDB connection URL from .env file
//DB =your database link 
const DB=process.env.MONGO_URI;
//on() listen for an event 
io.on('connection',(Socket)=>{
console.log(Socket.id);
Socket.on('test',(data)=>{
console.log(data);
});
});

mongoose.connect((DB)).then(()=>{
    console.log('Connection Successful');
}).catch((e)=>{
    console.log(e);
});

//listen to server 
server.listen(port,"0.0.0.0",()=>{
    console.log(`server started and running on port ${port}`);
});

