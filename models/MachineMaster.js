var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
// var mongoosePaginate = require("mongoose-paginate");

var MachineMasterSchema = new mongoose.Schema({
      Comp_Code: {
        type: String,
        required: true
      },
      Mc_Id: {
        type: String,
        required: true
      },
      Mc_Desc: {
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

module.exports = mongoose.model('UOB_Machine_Master',MachineMasterSchema);