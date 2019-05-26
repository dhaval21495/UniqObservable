  var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
// var mongoosePaginate = require("mongoose-paginate");

var CodeMasterSchema = new mongoose.Schema({
      Comp_Code: {
        type: String,
        required: true
      },
      Code_Type: {
        type: String,
        required: true
      },
      Code_Name: {
        type: String,
        required: true
      },
      Code_Desc: {
        type: String,
        required: true
      },
      Menu_Group: {
        type: String,
        required: true
      },
      Remark: {
        type: String,
        required: true
      },
      Active_YN: {
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

module.exports = mongoose.model('UOB_Code_Master',CodeMasterSchema);