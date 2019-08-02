  var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
// var mongoosePaginate = require("mongoose-paginate");

var NewMergerSchema = new mongoose.Schema({
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
      Denier: {
        type: String,
        required: true
      },
      Filament: {
        type: String,
        required: true
      },

      Oil_Level: {
        type: String,
        required: true
      },
      Ply: {
        type: String,
        required: true
      },
      Yarn_Speed: {
        type: String
      },
      Thread_Delay: {
        type: String
      },
      Bay_Doff_Time: {
        type: String
      },
      Doff_Interval: {
        type: String
      },
      Doff_Weight: {
        type: String
      },
      Doff_Length: {
        type: String
      },
      Doff_By_Fixed: {
        type: String
      },
      Traverse_Speed: {
        type: String
      },

      Tension_Sensor: {
        type: String
      },
      Yern_Runing_Level: {
        type: String
      },
      Cut_Control: {
        type: String
      },
      Cut_Control_Time: {
        type: String,
        required: true
      },
      Disable_Grading: {
        type: String
      },
      Tension_Global_G2: {
        type: String
      },
      Tension_Global_G3: {
        type: String
      },
      Tension_Global_G4: {
        type: String
      },
      Tension_Global_Reject: {
        type: String
      },
      Tension_CV_G2: {
        type: String
      },

      Tension_CV_G3: {
        type: String
      },
      Tension_CV_G4: {
        type: String
      },
      Tension_CV_Reject: {
        type: String
      },
      Tension_Transit_G2: {
        type: String
      },
      Tension_Transit_G3: {
        type: String
      },
      Tension_Transit_G4: {
        type: String
      },
      Tension_Transit_Reject: {
        type: String
      },
      Short_Pack_Grading: {
        type: String
      },
      Full_Pack: {
        type: String
      },
      Reject_Qty: {
        type: String
      },

      Event_Count: {
        type: String
      },
      Minutes: {
        type: String
      },
      Grade: {
        type: String
      },
      Tension_Step_Grade: {
        type: String
      },
      Direct_Rej_Oil: {
        type: String
      },
      Direct_Rej_Interlace: {
        type: String
      },
      Tension_Ref: {
        type: String
      },
      Tension_Global_Upper: {
        type: String
      },
      Tension_Global_Lower: {
        type: String
      },
      CV_Period: {
        type: String
      },

      CV_Limit: {
        type: String
      },
      Tension_Transit_Upper: {
        type: String
      },
      Tension_Transit_Lower: {
        type: String
      },
      Response_Time: {
        type: String
      },
      Min_Duration: {
        type: String
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

module.exports = mongoose.model('UOB_new_merge',NewMergerSchema);