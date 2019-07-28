  var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
// var mongoosePaginate = require("mongoose-paginate");

var ConfigMergerSchema = new mongoose.Schema({
      Comp_Code: {
        type: String,
        required: true
      },
      Mc_Id: {
        type: String,
        required: true
      },
      Merge_Code: {
        type: String,
        required: true
      },
      Based_On: {
        type: String,
        required: true
      },
      Set_Merge_Range: {
        type: String,
        required: true
      },
      Created_By: {
        type: String
      },
      Created_Dt: {
        type: String
      },
      Modify_By: {
        type: String
      },
      Modify_Dt: {
        type: String
      }
});

module.exports = mongoose.model('UOB_Config_merge',ConfigMergerSchema);