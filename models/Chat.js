var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
    // from_id: String,
    // to_id: String,
    from_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    to_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    msg: String,
    date: { type: Date, default: Date.now },
});

// the schema is useless so far
// we need to create a model using it
var Chat = mongoose.model('chat', userSchema);

// make this available to our users in our Node applications
module.exports = Chat;