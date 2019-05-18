var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
// var mongoosePaginate = require("mongoose-paginate");

var MachineSchema = new mongoose.Schema({
      Mc_desc: {
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

module.exports = mongoose.model('Machine',MachineSchema);