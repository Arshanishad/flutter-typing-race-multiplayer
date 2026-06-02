const mongoose = require('mongoose');
const playerSchema = require('./player');
const gameschema = new mongoose.schema({
    words: [
        {
            type: String,

        }
    ],
    players: [playerSchema],
    isJoin: {
        type: Boolean,
        default: true,
    },
    isOver: {
        type: Boolean,
        default: false,
    },
});
