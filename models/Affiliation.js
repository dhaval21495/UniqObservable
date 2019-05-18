var mongoose = require('mongoose');

    var AffiliationSchema = new mongoose.Schema({
        affiliation_name: String,
        status: Boolean,
        created_at: { type: Date, default: Date.now },
    });

module.exports = mongoose.model('affiliations', AffiliationSchema);