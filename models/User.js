var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var mongoosePaginate = require("mongoose-paginate");

var UserSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Enter a Name"] },
  date_of_birth: { type: String, required: [true, "Enter a Date of Birth"] },
  // gender: { type: String, required: [true, "Enter a Gender"] },
  // interested_in: { type: String, required: [true, "Select a Interested in"] },
  // looking_for: { type: String, required: [true, "Select a Looking for"] },
  email: { type: String, required: [true, "Enter a Email"] },
  password: { type: String, required: [true, "Enter a password"] },
  // yale_affiliation: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "affiliations",
  //   required: [true, "Enter a Yale Affiliation"]
  // },
  // profile_image: { type: String, required: [true, 'Select a Profile Image']},
  // profile_image: { type: String },
  // about_me: { type: String, required: [true, "Enter a About me"] },
  // is_login: Boolean,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  role_type: Number,
  is_confirmed: Boolean,
  status: Boolean
});

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("users", UserSchema);