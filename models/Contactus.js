var mongoose = require('mongoose');

var ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    message: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('contacts', ContactSchema);