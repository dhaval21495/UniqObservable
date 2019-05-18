var mongoose = require('mongoose');

var CmsSchema = new mongoose.Schema({
    type: String,
    image: String,
    cms_title: String,
    cms_description: String,
    status: Boolean,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('cms', CmsSchema);