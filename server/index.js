//IMPORTS
const express = require('express');
const http  = require ('http');
const mongoose = require('mongoose');

// create a server
const app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);

//middle ware
app.use(express.json());
//FRONTEND->MIDDLEWARE->BACKEND

//EVERYTHING IN JAVASCRIPT IS AN OBJECT
//listen to server
server.listen(port,"0.0.0.0",()=>{
    console.log(`Server started and running on port ${port}`);
});


