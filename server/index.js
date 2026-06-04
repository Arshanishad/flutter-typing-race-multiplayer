// 1. Import required packages
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config();
const { Server } = require('socket.io');
const Game = require ('./models/Game');

// 2.Create a new backend application (server app) using Express
const app = express();

// 3. Define port
const port = process.env.PORT || 3000;

// 4. Create HTTP server using Express app
const server = http.createServer(app);

// 5. Attach Socket.IO to server
const io = new Server(server);

// 6. Middleware (to read JSON data)
app.use(express.json());

// 7. Connect to MongoDB
const DB = process.env.MONGO_URI;

mongoose.connect(DB)
    .then(() => {
        console.log('Database Connected');
    })
    .catch((e) => {
        console.log(e);
    });

// 8. Socket connection -listening to socket io events from the client (flutter code )
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // 9. Listen event from Flutter
    socket.on('create-game', async ({ nickname }) => {
        try {
            let game = new Game();
        } catch (e) {
            console.log(e);
        }
        // 10. Send response back
        socket.emit('game-created', {
            message: 'Game created successfully'
        });
    });

    // 11. Disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// 12.Start the server on a given port and make it listen for incoming requests
server.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
});