var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var BlogSchema = new mongoose.Schema({
    blog_title: String,
    blog_description: String,
    status: Boolean,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
});

BlogSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('blogs', BlogSchema);