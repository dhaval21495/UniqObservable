var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
// var mongoosePaginate = require("mongoose-paginate");

var ComapnyMasterSchema = new mongoose.Schema({
  Comp_Code: {
        type: String,
        required: true
      },
      Comp_Name: {
        type: String,
        required: true
      },
      Owner_Name: {
        type: String,
        required: true
      },
      Address: {
        type: String,
        required: true
      },
      City: {
        type: String,
        required: true
      },
      State: {
        type: String,
        required: true
      },
      Country: {
        type: String,
        required: true
      },
      Comp_Email: {
        type: String,
        required: true
      },
      Comp_Mobile_No: {
        type: String,
        required: true
      },
      Landline_No: {
        type: String,
        required: true
      },
      Web_Url: {
        type: String,
        required: true
      },
      Date_Of_Reg: {
        type: String,
        required: true
      },
      License_No: {
        type: String,
        required: true
      },
      Buss_Type: {
        type: String,
        required: true
      },
      Buss_Nature: {
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

// ComapnyMasterSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('UOB_Company_Master',ComapnyMasterSchema);