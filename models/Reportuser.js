var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// create a schema
var reportUser = new Schema({
  u_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  to_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  msg: String,
  date: { type: Date, default: Date.now }
});

// the schema is useless so far
// we need to create a model using it
var ReportUser = mongoose.model("reportuser", reportUser);

// make this available to our users in our Node applications
module.exports = ReportUser;
