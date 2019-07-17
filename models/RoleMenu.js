  var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
// var mongoosePaginate = require("mongoose-paginate");

var RoleMenuSchema = new mongoose.Schema({
      // Comp_Code: {
      //   type: String,
      //   required: true
      // },
      // Menu_Id: {
      //   type: String,
      //   required: true
      // },
      User_Role: {
        type: String,
        required: true
      },
      Sub_Group: {
        type: String,
        required: true
      },
      Menu_Assign: {
        type: String,
        required: true
      }
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

module.exports = mongoose.model('UOB_Role_Menu',RoleMenuSchema);