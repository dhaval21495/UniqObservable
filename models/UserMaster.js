  var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
// var mongoosePaginate = require("mongoose-paginate");

var UserMasterSchema = new mongoose.Schema({
      Comp_Code: {
        type: String,
        required: true
      },
      User_Type: {
        type: String,
        required: true
      },
      User_EP_No: {
        type: String,
        required: true
      },
      User_Name: {
        type: String,
        required: true
      },
      User_Email: {
        type: String,
        required: true
      },
      User_Mobile_No: {
        type: String,
        required: true
      },
      Alternate_No: {
        type: String,
        required: true
      },
      User_Password: {
        type: String,
        required: true
      },
      Created_By: {
        type: String,
        required: true
      },
      Created_Dt: {
        type: String,
        required: true
      },
      Modify_By: {
        type: String,
        required: true
      },
      Modify_Dt: {
        type: String,
        required: true
      }
});

module.exports = mongoose.model('UOB_User_Master',UserMasterSchema);