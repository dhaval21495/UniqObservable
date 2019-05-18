var mongoose = require('mongoose');

var HostSchema = new mongoose.Schema({
    host_name: String,
    status: Boolean,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('hosts', HostSchema);