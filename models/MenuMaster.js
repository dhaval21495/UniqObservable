  var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
// var mongoosePaginate = require("mongoose-paginate");

var MenuMasterSchema = new mongoose.Schema({
      // Comp_Code: {
      //   type: String,
      //   required: true
      // },
      Menu_Type: {
        type: String,
        required: true
      },
      Menu_Name: {
        type: String,
        required: true
      },
      Menu_Desc: {
        type: String,
        required: true
      },
      Menu_Group: {
        type: String,
        required: true
      },
      Menu_Sub_Group: {
        type: String,
        required: true
      },
      Menu_Url: {
        type: String,
        required: true
      },
      // Created_By: {
      //   type: String,
      //   required: true
      // },
      // Created_Dt: {
      //   type: String,
      //   required: true
      // },
      // Modify_By: {
      //   type: String,
      //   required: true
      // },
      // Modify_Dt: {
      //   type: String,
      //   required: true
      // }
});

module.exports = mongoose.model('UOB_Menu_Master',MenuMasterSchema);