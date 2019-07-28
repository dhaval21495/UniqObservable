  var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
// var mongoosePaginate = require("mongoose-paginate");

var MappingMasterSchema = new mongoose.Schema({
      Comp_Code: {
        type: String,
        required: true
      },
      Mc_Id: {
        type: String,
        required: true
      },
      Mc_Side: {
        type: String,
        required: true
      },
      Mc_Section: {
        type: String,
        required: true
      },
      Mc_Deck: {
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

module.exports = mongoose.model('UOB_Mapping_Master',MappingMasterSchema);