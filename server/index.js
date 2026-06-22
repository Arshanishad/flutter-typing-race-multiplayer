// 1. Import packages
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config();

//From socket.io package ,take only the Server class 
//socket.io package=toolbox
//Server = one tool inside toolbox
//selecting the tool need
//import tool (Server)
// var io =require('socket.io')(server);- old style 

const { Server } = require('socket.io');
const Game = require('./models/Game');
const getSentence = require('./api/getSentence');

// 2. Create app
const app = express();

// 3. Port
const port = process.env.PORT || 3000;

// 4. Create server
const server = http.createServer(app);

// 5. Socket setup
//create Socket.io system  using my http server 
//Server(server) = install real-time engine on your backend
//io = that engine controller
//attach tool to HTTP server
const io = new Server(server);

// 6. Middleware
app.use(express.json());

// 7. Connect MongoDB
const DB = process.env.MONGO_URI;
mongoose.connect(DB) .then(() => {
    console.log('Database Connected');
  }) .catch((e) => {
   console.log(e); 
  });

// 8. Socket connection
io.on('connection', (socket) => {
  console.log(' User connected:', socket.id);
  // socket.on('test',(data)=>{
  //  console.log(data);
  // })
  socket.on('create-game', async ({ nickname }) => {
    try {
      let game = new Game();
      const sentence = await getSentence();
      game.words = sentence;
      let player = {
        socketID: socket.id,
        nickname,
        isPartyLeader:true,
      }
      game.players.push(player);
      game =await game.save();
      const gameId = game._id.toString();
      socket.join(gameId);
      io.to(gameId).emit('updatedGame',game);
    } catch (e) {
      console.log(e);
    }
  });

  // 10. Disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// 11. Start server
// server.listen(port, "0.0.0.0", () => {
//   console.log(`Server running on port ${port}`);
// });
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

