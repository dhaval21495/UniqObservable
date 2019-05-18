var mongoose = require('mongoose');

var Matcheschema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'Enter a User id']
    },
    partner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'Enter a Partner id']
    },
    user_like: String,
    user_like_date: Date,
    partner_like: String,
    partner_like_date: Date,
    chat_date: Date,
    uid_read: Number,
    partner_read: Number,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('matches', Matcheschema);