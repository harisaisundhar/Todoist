var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  name: {
    type: String,
    required: "default field : Name"
  },
  status: {
    type: [{
      type: String,
      enum: ["pending", "processing", "completed"]
    }],
    default: ["pending"]
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Tasks", TaskSchema);