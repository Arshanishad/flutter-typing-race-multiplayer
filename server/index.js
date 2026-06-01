//IMPORTS
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
var io=require('socket.io')(server);
require("dotenv").config();

// create a server
const app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = require("socket.io")(server);

//middle ware
app.use(express.json());
//FRONTEND->MIDDLEWARE->BACKEND
//EVERYTHING IN JAVASCRIPT IS AN OBJECT

//connect to mongodb
const DB = process.env.MONGO_URI;

//listening to the socket io event s from the client(flutter code)
io.on('connection',(socket)=>{
    console.log(socket.id);
    socket.on('test',(data)=>{
        console.log(data);
    });
})

mongoose.connect((DB)).then(() => {
    console.log('Connection Successful');
}).catch((e) => {
    console.log(e);
});

//listen to server
server.listen(port, "0.0.0.0", () => {
    console.log(`Server started and running on port ${port}`);
});



