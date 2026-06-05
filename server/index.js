// ================= IMPORTS =================
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config();
const { Server } = require('socket.io');
const Game = require('./models/Game');

// ================= APP SETUP =================
const app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

app.use(express.json());

// ================= DB CONNECTION =================
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Database Connected'))
    .catch((e) => console.log(e));

// ================= SAMPLE WORDS =================
const WORDS = [
    "flutter", "node", "socket", "mongodb", "express",
    "typing", "game", "speed", "keyboard", "developer"
];

// ================= SOCKET =================
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // ================= CREATE GAME =================
    socket.on('create-game', async ({ nickname }) => {
        try {
            const roomId = Math.floor(100000 + Math.random() * 900000).toString();

            const game = new Game({
                roomId,
                words: WORDS,
                players: [{
                    socketId: socket.id,
                    nickname,
                    progress: 0,
                }],
                isJoin: true,
                isOver: false,
            });

            await game.save();
            socket.join(roomId);

            socket.emit('create-game-success', game);

        } catch (e) {
            socket.emit('error', 'Create game failed');
        }
    });

    // ================= JOIN GAME =================
    socket.on('join-game', async ({ nickname, roomId }) => {
        try {
            const game = await Game.findOne({ roomId });

            if (!game) {
                socket.emit('error', 'Room not found');
                return;
            }

            if (!game.isJoin) {
                socket.emit('error', 'Game already started');
                return;
            }

            if (game.players.length >= 2) {
                socket.emit('error', 'Room full');
                return;
            }

            const already = game.players.find(p => p.socketId === socket.id);
            if (already) return;

            game.players.push({
                socketId: socket.id,
                nickname,
                progress: 0,
            });

            await game.save();
            socket.join(roomId);

            io.to(roomId).emit('player-joined', game);

        } catch (e) {
            socket.emit('error', 'Join failed');
        }
    });

    // ================= START GAME =================
    socket.on('start-game', async ({ roomId }) => {
        try {
            const game = await Game.findOne({ roomId });

            if (!game) return;

            if (game.players.length < 2) {
                socket.emit('error', 'Need 2 players');
                return;
            }

            game.isJoin = false;
            await game.save();

            // countdown
            let count = 3;
            const interval = setInterval(() => {
                io.to(roomId).emit('countdown', count);
                count--;

                if (count < 0) {
                    clearInterval(interval);
                    io.to(roomId).emit('game-started', game);
                }
            }, 1000);

        } catch (e) {
            socket.emit('error', 'Start failed');
        }
    });

    // ================= UPDATE PROGRESS =================
    socket.on('update-progress', async ({ roomId, progress }) => {
        try {
            const game = await Game.findOne({ roomId });
            if (!game || game.isOver) return;

            const player = game.players.find(p => p.socketId === socket.id);
            if (!player) return;

            player.progress = progress;

            // ✅ AUTO END GAME
            if (progress >= 100) {
                game.isOver = true;

                const winner = game.players.reduce((prev, curr) =>
                    prev.progress > curr.progress ? prev : curr
                );

                await game.save();

                io.to(roomId).emit('game-ended', winner);
                return;
            }

            await game.save();

            io.to(roomId).emit('progress-update', game.players);

        } catch (e) {
            socket.emit('error', 'Progress update failed');
        }
    });

    // ================= DISCONNECT =================
    socket.on('disconnect', async () => {
        console.log('User disconnected:', socket.id);

        try {
            const game = await Game.findOne({
                "players.socketId": socket.id
            });

            if (!game) return;

            // remove player
            game.players = game.players.filter(
                p => p.socketId !== socket.id
            );

            // if no players → delete game
            if (game.players.length === 0) {
                await Game.deleteOne({ roomId: game.roomId });
                return;
            }

            await game.save();

            io.to(game.roomId).emit('player-left', game.players);

        } catch (e) {
            console.log(e);
        }
    });
});

// ================= START SERVER =================
server.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
});